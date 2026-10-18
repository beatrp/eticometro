#!/usr/bin/env python3
"""Junta index.html + css/ + js/ em um único arquivo (dist/eticometro.html),
útil para publicar em hospedagens que aceitam só um arquivo."""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")
def css(m): return "<style>\n" + (root / m.group(1)).read_text(encoding="utf-8") + "</style>"
def js(m): return "<script>\n" + (root / m.group(1)).read_text(encoding="utf-8") + "</script>"
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css, html)
html = re.sub(r'<script src="([^"]+)"></script>', js, html)
out = root / "dist" / "eticometro.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding="utf-8")
print("Gerado:", out)
