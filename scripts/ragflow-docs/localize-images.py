#!/usr/bin/env python3
"""
图片本地化管线（补丁步骤：en/zh 里的外链图片 → 自托管）

为什么需要：文档源码里的图片热链 raw.githubusercontent.com（144 个 main 引用 +
49 个 commit 锁定引用），该域名在部分网络环境（尤其国内）经常不可达——
浏览器端表现为浮层里图片裂图。把图片下载到博客 public/ragflow-images/ 自托管，
链接改写为站内路径 /ragflow-images/<文件名>，彻底摆脱运行时对外链的依赖。

下载通道（按序回退）：
1. jsDelivr CDN（cdn.jsdelivr.net/gh/<repo>@<ref>/<path>）——同时支持 main 与 commit ref
2. raw.githubusercontent.com 原始 URL

用法：python3 scripts/ragflow-docs/localize-images.py
  - 已存在的本地图片自动跳过（增量）
  - 默认只改写 en/ 与 zh/（配对文件由 build-paired.py 重新生成）
"""

import re
import subprocess
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

REPO = Path(__file__).resolve().parents[2]
EN = REPO / "docs" / "posts" / "ai" / "ragflow" / "en"
ZH = REPO / "docs" / "posts" / "ai" / "ragflow" / "zh"
IMG_DIR = REPO / "docs" / "public" / "ragflow-images"

# 图片魔数 → 扩展名（URL 无扩展名时按内容识别，保证 GitHub Pages 返回正确 Content-Type）
MAGIC = [
    (b"\xff\xd8\xff", ".jpg"),
    (b"\x89PNG", ".png"),
    (b"GIF8", ".gif"),
    (b"RIFF", ".webp"),
]


def sniff_ext(data: bytes) -> str | None:
    """按魔数识别图片类型，返回扩展名（非图片返回 None）。"""
    for magic, ext in MAGIC:
        if data.startswith(magic):
            return ext
    return None


def fetch(url: str) -> bytes | None:
    """下载（jsDelivr 优先、raw 回退），带 3 次退避重试。"""
    candidates = [url]
    # raw.githubusercontent.com/infiniflow/ragflow-docs/<ref>/<path> → jsDelivr
    m = re.match(r"https://raw\.githubusercontent\.com/infiniflow/ragflow-docs/([^/]+)/(.+)", url)
    if m:
        candidates.insert(0, "https://cdn.jsdelivr.net/gh/infiniflow/ragflow-docs@%s/%s" % (m.group(1), m.group(2)))
    # github.com/infiniflow/ragflow-docs/blob/<ref>/<path>（网页 URL，img 标签里本来就裂）→ jsDelivr
    m = re.match(r"https://github\.com/infiniflow/ragflow-docs/blob/([^/]+)/(.+)", url)
    if m:
        candidates.insert(0, "https://cdn.jsdelivr.net/gh/infiniflow/ragflow-docs@%s/%s" % (m.group(1), m.group(2)))

    for attempt in range(3):
        for u in candidates:
            try:
                r = subprocess.run(
                    ["curl", "-sL", "--max-time", "60", u],
                    capture_output=True, timeout=90,
                )
                if r.returncode == 0 and r.stdout and sniff_ext(r.stdout):
                    return r.stdout
            except Exception:  # noqa: BLE001 - 网络异常走重试
                pass
        time.sleep(2 * (attempt + 1))
    return None


def main():
    IMG_DIR.mkdir(parents=True, exist_ok=True)

    # 1) 扫描 en/ 全部图片引用（markdown 图片 + <img> 标签），去重
    urls = set()
    for f in EN.glob("*.md"):
        text = f.read_text(encoding="utf-8")
        urls.update(re.findall(r"!\[[^\]]*\]\((https?://[^)]+)\)", text))
        urls.update(re.findall(r'<img[^>]+src="(https?://[^"]+)"', text))
    print("发现 %d 个外链图片 URL" % len(urls))

    # 2) 逐个下载到 public/ragflow-images/（同文件名优先 main 版本；已存在跳过）
    #    local 名 = URL basename（无扩展名时按魔数补）
    url_to_local, failed = {}, []
    # main 引用排前面：同名文件先落盘 main 版本，commit 锁定版视为同一张跳过
    ordered = sorted(urls, key=lambda u: ("/main/" not in u, u))
    total_bytes = 0
    for url in ordered:
        base = url.rsplit("/", 1)[-1].split("?")[0]
        stem, dot, ext = base.partition(".")
        # 统一成「stem + .ext」形态：URL 自带扩展名时 partition 吃掉了点，必须补回；
        # 无扩展名（user-attachments 等）按魔数识别补——不带点拼 stem+ext 会得到
        # "foojpg" 这种无扩展名文件（rollup 解析报错 + Pages 返回错误 Content-Type）
        ext = ("." + ext) if ext else ""
        existing = list(IMG_DIR.glob(stem + ".*")) if not ext else [IMG_DIR / (stem + ext)]
        if any(p.is_file() for p in existing):
            local = next(p for p in existing if p.is_file()).name
            url_to_local[url] = local
            continue
        data = fetch(url)
        if data is None:
            failed.append(url)
            print("FAIL %s" % url)
            continue
        if not ext:
            ext = sniff_ext(data) or ".png"
        (IMG_DIR / (stem + ext)).write_bytes(data)
        url_to_local[url] = stem + ext
        total_bytes += len(data)
        print("ok   %-50s %7d bytes" % (stem + ext, len(data)))

    # 3) 改写 en/ 与 zh/ 里的 URL → /ragflow-images/<local>
    rewritten = 0
    for d in (EN, ZH):
        if not d.is_dir():
            continue
        for f in d.glob("*.md"):
            text = f.read_text(encoding="utf-8")
            new = text
            for url, local in url_to_local.items():
                new = new.replace(url, "/ragflow-images/" + local)
            if new != text:
                f.write_text(new, encoding="utf-8")
                rewritten += 1

    print("-" * 60)
    print("下载 %d 张（新增 %.1f MB），改写 %d 个文件；失败 %d 个" % (
        len(url_to_local), total_bytes / 1048576, rewritten, len(failed)))
    if failed:
        print("失败清单：")
        for u in failed:
            print("  " + u)


if __name__ == "__main__":
    main()
