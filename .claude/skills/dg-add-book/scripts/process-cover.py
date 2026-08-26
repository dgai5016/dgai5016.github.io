#!/usr/bin/env python3
"""
process-cover.py — 书单封面处理：防盗链下载 → 方图分诊裁剪 → 双规格入库

输出两份文件（页面封面点击放大依赖 -full 版，缩略图直接放大是糊的）：
  <out-dir>/<slug>.jpg        列表缩略图：144px 高（48px 显示的 3x Retina）
  <out-dir>/<slug>-full.jpg   灯箱高清图：600px 高，不裁剪（方图保持原样，放大看全貌）

用法（在博客仓库根目录执行）：
  python3 .claude/skills/dg-add-book/scripts/process-cover.py --url <图片URL> --slug <slug>
  python3 .claude/skills/dg-add-book/scripts/process-cover.py --file <本地路径> --slug <slug>
  # 设计方图（脚本拒绝自动裁后）用视觉分析拿到布局，手动指定裁剪区重跑：
  python3 .claude/skills/dg-add-book/scripts/process-cover.py --file /tmp/xxx.jpg --slug <slug> --box "120,0,640,800"

参数：
  --url      图片 URL（按域名自动带 referer 防盗链）
  --file     本地图片路径（与 --url 二选一）
  --slug     输出文件名前缀
  --out-dir  输出目录，默认 docs/public/covers/books
  --box      手动裁剪区 "x1,y1,x2,y2"（像素，用于非白底设计方图；只影响缩略图，full 版仍保持原图）

退出码：
  0 成功 | 1 参数/下载错误 | 2 非白底设计方图，拒绝自动裁剪（需视觉分析后 --box 重跑）

方图分诊逻辑（真实案例沉淀）：
  - 比例 > 0.85 视为方图。图书电商的方图分两类：
    a) 白底居中书（多数）：四边扫描纯白边缘自动裁出书本本体 —— 缩略图自动处理
    b) 设计方图（如《读书变现》橙色方形封面）：乱裁会切书名，脚本退出码 2，
       要求先用视觉分析确定书名/主视觉位置，再 --box 指定裁剪区
"""
import argparse
import os
import subprocess
import sys
import tempfile

from PIL import Image

# 图片 CDN 域名 → 对应站点 referer（豆瓣/当当图片都有防盗链，缺 referer 会 403/404）
REFERER_MAP = [
    ('doubanio.com', 'https://book.douban.com/'),
    ('ddimg.cn', 'https://product.dangdang.com/'),
    ('360buyimg.com', 'https://item.jd.com/'),
]

# 下载用系统 curl（自动走环境代理，比 python urllib 在代理环境下更稳）
CURL_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

# 判定阈值与输出规格
SQUARE_RATIO = 0.85   # 宽/高 超过此值视为方图
WHITE_TH = 245        # RGB 三通道都 >= 此值算「白」
THUMB_H = 144         # 缩略图高度：列表显示 48px 的 3x Retina
FULL_H = 600          # 灯箱高清图高度
JPEG_Q = 75


def near_white(px):
    return all(c >= WHITE_TH for c in px[:3])


def trim_white(img):
    """四边向内扫描非白像素，返回书本本体的边界 box；扫描不到（非白底）返回 None"""
    w, h = img.size
    px = img.load()
    edges = {}
    for x in range(w):  # 左边界
        if any(not near_white(px[x, y]) for y in range(0, h, 4)):
            edges['l'] = x; break
    for x in range(w - 1, -1, -1):  # 右边界
        if any(not near_white(px[x, y]) for y in range(0, h, 4)):
            edges['r'] = x; break
    for y in range(h):  # 上边界
        if any(not near_white(px[x, y]) for x in range(0, w, 4)):
            edges['t'] = y; break
    for y in range(h - 1, -1, -1):  # 下边界
        if any(not near_white(px[x, y]) for x in range(0, w, 4)):
            edges['b'] = y; break
    if len(edges) < 4:
        return None
    return (edges['l'], edges['t'], edges['r'] + 1, edges['b'] + 1)


def load_image(args):
    """按 --url（带防盗链 referer 下载）或 --file 读图"""
    if args.url:
        referer = next((r for domain, r in REFERER_MAP if domain in args.url), '')
        tmp = tempfile.NamedTemporaryFile(suffix='.img', delete=False).name
        cmd = ['curl', '-L', '-sS', '--max-time', '30', '-A', CURL_UA, '-o', tmp, args.url]
        if referer:
            cmd[-1:-1] = ['-e', referer]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f'下载失败: {r.stderr[:120]}')
        path = tmp
    elif args.file:
        path = args.file
    else:
        sys.exit('必须提供 --url 或 --file 之一')
    try:
        return Image.open(path).convert('RGB'), path
    except Exception as e:
        sys.exit(f'不是有效图片（可能是 HTML 报错页）: {e}')


def save_resized(img, out_path, target_h, quality=JPEG_Q):
    """等比缩到指定高度 + JPEG 压缩落盘（输出目录不存在则自动创建）"""
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    nw = round(img.width * target_h / img.height)
    img.resize((nw, target_h), Image.LANCZOS).save(out_path, 'JPEG', quality=quality)
    print(f'入库: {out_path} ({nw}x{target_h}, {os.path.getsize(out_path) // 1024}KB)')


def save_full(img, out_dir, slug):
    """灯箱高清图：600px 高、不裁剪（方图保持原样——放大是为了看全貌）"""
    save_resized(img, os.path.join(out_dir, slug + '-full.jpg'), FULL_H, quality=80)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--url'); ap.add_argument('--file'); ap.add_argument('--slug', required=True)
    ap.add_argument('--out-dir', default='docs/public/covers/books')
    ap.add_argument('--box', help='手动裁剪区 x1,y1,x2,y2')
    args = ap.parse_args()

    img, tmp_path = load_image(args)
    w, h = img.size
    print(f'原图: {w}x{h} (比例 {w / h:.2f})')

    if args.box:  # 手动裁剪优先（设计方图的兜底路径；只影响缩略图）
        x1, y1, x2, y2 = (int(v) for v in args.box.split(','))
        save_resized(img.crop((x1, y1, x2, y2)), os.path.join(args.out_dir, args.slug + '.jpg'), THUMB_H)
        save_full(img, args.out_dir, args.slug)
        return

    if w / h > SQUARE_RATIO:  # 方图分诊
        box = trim_white(img)
        if box:
            bw, bh = box[2] - box[0], box[3] - box[1]
            if bw / bh <= SQUARE_RATIO and bw > 60:  # 裁出的确实像竖版书
                print(f'白底居中书，自动裁白边: {box} ({bw}x{bh})')
                save_resized(img.crop(box), os.path.join(args.out_dir, args.slug + '.jpg'), THUMB_H)
                save_full(img, args.out_dir, args.slug)
                return
            print(f'白边扫描结果不像竖版书 ({bw}x{bh} 比例 {bw / bh:.2f})')
        # 走到这 = 非白底设计方图：拒绝乱裁（乱裁会切书名），要求人工定裁剪区
        print('!! 设计方图（非白底），自动裁剪可能切掉书名。')
        print(f'!! 请先用视觉分析确定书名/主视觉位置，然后加 --box "x1,y1,x2,y2" 重跑（原图已留 {tmp_path}）')
        sys.exit(2)

    save_resized(img, os.path.join(args.out_dir, args.slug + '.jpg'), THUMB_H)  # 正常竖版图
    save_full(img, args.out_dir, args.slug)


if __name__ == '__main__':
    main()
