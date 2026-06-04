#!/usr/bin/env python3
"""One-off migration: replace inline CARE top+header with shared mount + assets."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HEADER_BLOCK_RE = re.compile(
    r'<div class="top[^"]*"[^>]*>.*?</header>\s*(?:<!--\s*/\.header\s*-->)?',
    re.DOTALL | re.IGNORECASE,
)

MOUNT_HTML = (
    '            <div id="care-site-header-mount" class="care-site-header-mount"></div>\n'
)

CSS_NEEDLE = 'href="stylesheets/responsive.css">'
CSS_INSERT = (
    'href="stylesheets/responsive.css">\n'
    '    <link rel="stylesheet" type="text/css" href="stylesheets/site-header.css">'
)

JQ = '<script type="text/javascript" src="javascript/jquery.min.js"></script>'
JQ_WITH_HEADER = (
    '<script type="text/javascript" src="javascript/jquery.min.js"></script>\n'
    '    <script type="text/javascript" src="javascript/site-header.js"></script>'
)


def migrate_file(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="replace")
    if "care-site-header-mount" in text:
        return "skip-already"
    if "Logo-Care" not in text:
        return "skip-no-logo"

    m = HEADER_BLOCK_RE.search(text)
    if not m:
        return "skip-no-match"

    text = text[: m.start()] + MOUNT_HTML + text[m.end() :]

    if "site-header.css" not in text:
        if CSS_NEEDLE not in text:
            return "error-no-responsive-css"
        text = text.replace(CSS_NEEDLE, CSS_INSERT, 1)

    if "site-header.js" not in text:
        if JQ not in text:
            return "error-no-jquery"
        text = text.replace(JQ, JQ_WITH_HEADER, 1)

    path.write_text(text, encoding="utf-8")
    return "ok"


def main() -> int:
    results = {
        "ok": [],
        "skip_already": [],
        "skip_no_logo": [],
        "skip_no_match": [],
        "error": [],
    }
    for path in sorted(ROOT.glob("*.html")):
        r = migrate_file(path)
        if r == "ok":
            results["ok"].append(path.name)
        elif r == "skip-already":
            results["skip_already"].append(path.name)
        elif r == "skip-no-logo":
            results["skip_no_logo"].append(path.name)
        elif r == "skip-no-match":
            results["skip_no_match"].append(path.name)
        else:
            results["error"].append(f"{path.name}: {r}")

    print("OK:", len(results["ok"]))
    for n in results["ok"]:
        print(" ", n)
    for k, v in results.items():
        if k == "ok" or not v:
            continue
        print(f"{k}:", v)
    return 0 if not results["error"] else 1


if __name__ == "__main__":
    sys.exit(main())
