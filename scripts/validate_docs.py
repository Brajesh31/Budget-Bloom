#!/usr/bin/env python3
"""Validate Markdown files and relative links without network access."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LINK = re.compile(r"!??\[[^\]]*\]\(([^)]+)\)")
SCHEME = re.compile(r"^[a-zA-Z][a-zA-Z0-9+.-]*:")


def validate(path: Path) -> list[str]:
    errors: list[str] = []
    content = path.read_text(encoding="utf-8")
    if not content.strip():
        return [f"{path.relative_to(ROOT)}: empty Markdown file"]

    in_fence = False
    for line_no, line in enumerate(content.splitlines(), 1):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue

        for raw in LINK.findall(line):
            target = raw.strip().split()[0].strip("<>")
            if not target or target.startswith("#") or SCHEME.match(target):
                continue
            target = target.split("#", 1)[0].split("?", 1)[0]
            if not target:
                continue
            resolved = (path.parent / target).resolve()
            try:
                resolved.relative_to(ROOT)
            except ValueError:
                errors.append(f"{path.relative_to(ROOT)}:{line_no}: link escapes repository: {target}")
                continue
            if not resolved.exists():
                errors.append(f"{path.relative_to(ROOT)}:{line_no}: broken local link: {target}")
    return errors


def main() -> int:
    documents = sorted(ROOT.rglob("*.md"))
    errors = [message for path in documents for message in validate(path)]
    if errors:
        print("\n".join(errors))
        return 1
    print(f"Validated {len(documents)} Markdown files: no empty files or broken local links.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
