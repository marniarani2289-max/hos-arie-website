"""Build the Blue Education orientation map from geoBoundaries / OSM geometry.

Usage: python scripts/build-blue-education-map.py [IDN.geojson MYS.geojson]
No invented coastlines or maritime boundary lines. See the asset source notice.
"""
import json
import math
import sys
import urllib.request
from pathlib import Path

BASE = "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen"
IDN = f"{BASE}/IDN/ADM1/geoBoundaries-IDN-ADM1_simplified.geojson"
MYS = f"{BASE}/MYS/ADM0/geoBoundaries-MYS-ADM0_simplified.geojson"


def read(path, url):
    if path:
        return json.loads(Path(path).read_text())
    with urllib.request.urlopen(url, timeout=45) as response:
        return json.load(response)


def point(lon, lat):
    # Equirectangular near the equator, with the same scale on both axes.
    return 20 + (lon - 102.2) * 86, 40 + (5.65 - lat) * 86


def paths(geometry):
    polygons = geometry["coordinates"] if geometry["type"] == "MultiPolygon" else [geometry["coordinates"]]
    for polygon in polygons:
        outer = polygon[0]
        if max(p[0] for p in outer) < 102.2 or min(p[0] for p in outer) > 110.8 or max(p[1] for p in outer) < -1.4 or min(p[1] for p in outer) > 5.8:
            continue
        parts = []
        for ring in polygon:
            coords = [point(*p[:2]) for p in ring]
            # Drop sub-pixel steps only; preserve original geographic vertices.
            filtered = [coords[0]]
            for p in coords[1:]:
                if math.dist(p, filtered[-1]) >= 0.38:
                    filtered.append(p)
            if len(filtered) < 3:
                filtered = coords
            parts.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in filtered) + "Z")
        yield "".join(parts)


def build(idn, mys):
    lines = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 650" role="img" aria-labelledby="title desc">',
             '<title id="title">Peta orientasi Provinsi Kepulauan Riau</title>',
             '<desc id="desc">Daratan Kepulauan Riau berwarna hijau kebiruan. Penanda menunjukkan Karimun, Batam, Bintan, Tanjungpinang, Lingga, Kepulauan Anambas, dan Natuna. Gugus Tambelan turut ditampilkan. Geometri disederhanakan dari geoBoundaries dan OpenStreetMap. Bukan peta batas laut atau navigasi.</desc>',
             '<metadata>© OpenStreetMap contributors; geoBoundaries. ODbL 1.0. IDN ADM1 source year 2017. Retrieved 2026-09-24. Equirectangular projection. See kepri-map-sources.md.</metadata>',
             '<defs><clipPath id="extent"><rect x="10" y="65" width="740" height="540" rx="4"/></clipPath></defs>',
             '<style>text{font-family:Arial,Helvetica,sans-serif}.label{fill:#e4f7f5;font-size:21px;font-weight:600;paint-order:stroke;stroke:#062a40;stroke-width:5px;stroke-linejoin:round}.context{fill:#7297aa;font-size:14px;letter-spacing:2px}.geo{fill:#668d9e;font-size:12px}.sea{fill:#80acbb;font-size:17px;letter-spacing:4px}.leader{fill:none;stroke:#94c9ca;stroke-width:1.2}.marker{fill:#f0cc82;stroke:#062a40;stroke-width:2}@media(max-width:500px){.label{font-size:26px}.context{font-size:19px}.geo{font-size:16px}.sea{font-size:21px}}</style>',
             '<text x="20" y="35" fill="#b3deda" font-family="Arial" font-size="15" letter-spacing="3">ATLAS KEPULAUAN RIAU</text>',
             '<g clip-path="url(#extent)">']
    for lon in [104,106,108,110]:
        x,_=point(lon,0)
        lines.append(f'<path d="M{x:.1f},65V605" stroke="#79b7c1" stroke-opacity=".11" stroke-dasharray="3 7"/><text class="geo" x="{x+5:.1f}" y="82">{lon}° BT</text>')
    for lat in [0,2,4]:
        _,y=point(0,lat)
        lines.append(f'<path d="M10,{y:.1f}H750" stroke="#79b7c1" stroke-opacity=".11" stroke-dasharray="3 7"/>')
    for f in idn["features"] + mys["features"]:
        if f["properties"].get("shapeISO") == "ID-KR":
            continue
        for d in paths(f["geometry"]):
            lines.append(f'<path d="{d}" fill="#163a4d" stroke="#315369" stroke-width=".7" fill-rule="evenodd"/>')
    kepri=next(f for f in idn["features"] if f["properties"].get("shapeISO")=="ID-KR")
    for d in paths(kepri["geometry"]):
        lines.append(f'<path d="{d}" fill="#69c8b9" stroke="#bcf4df" stroke-width=".75" fill-rule="evenodd"/>')
    lines.extend(['</g>', '<text class="context" x="42" y="236" transform="rotate(-58 42 236)">SEMENANJUNG MALAYA</text>',
                  '<text class="context" x="45" y="572" transform="rotate(30 45 572)">SUMATRA</text>',
                  '<text class="sea" x="470" y="346" text-anchor="middle">LAUT NATUNA</text>',
                  '<text class="context" x="675" y="540" text-anchor="middle" transform="rotate(-65 675 540)">KALIMANTAN</text>',
                  '<path d="M704,134V99M697,109L704,97L711,109" fill="none" stroke="#b5d6d8" stroke-width="1.5"/><text x="704" y="92" text-anchor="middle" fill="#b5d6d8" font-size="14">U</text>'])
    # Representative locality anchors; labels name districts/cities, not boundaries.
    labels=[
        (108.22,3.93,588,153,"Natuna","start"),
        (106.15,3.20,320,210,"Kep. Anambas","middle"),
        (103.39,1.02,102,482,"Karimun","end"),
        (104.04,1.07,176,388,"Batam","middle"),
        (104.52,1.10,296,426,"Bintan","start"),
        (104.45,.92,320,480,"Tanjungpinang","start"),
        (104.62,-.16,308,567,"Lingga","start"),
    ]
    for lon,lat,tx,ty,label,anchor in labels:
        x,y=point(lon,lat)
        lx=tx-8 if anchor=="start" else tx+8 if anchor=="end" else tx
        lines.append(f'<path class="leader" d="M{x:.1f},{y:.1f}L{lx},{ty-6}"/>')
        if label=="Tanjungpinang":
            lines.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="none" stroke="#f0cc82" stroke-width="1.4"/>')
        lines.append(f'<circle class="marker" cx="{x:.1f}" cy="{y:.1f}" r="4.3"/><text class="label" x="{tx}" y="{ty}" text-anchor="{anchor}">{label}</text>')
    x,y=point(107.97,.98)
    lines.append(f'<text x="{x-25:.1f}" y="{y+34:.1f}" class="context" style="letter-spacing:0">Kep. Tambelan</text>')
    lines.extend(['<circle cx="22" cy="627" r="4" fill="#69c8b9"/><text x="35" y="632" fill="#a7c6ce" font-size="14">Daratan Kepri</text>',
                  '<circle cx="205" cy="627" r="5" fill="none" stroke="#f0cc82"/><text x="218" y="632" fill="#a7c6ce" font-size="14">Ibu kota provinsi</text>',
                  '<text x="742" y="632" text-anchor="end" fill="#7d9eae" font-size="12">Peta orientasi · disederhanakan</text>', '</svg>'])
    return "\n".join(lines)


if __name__ == "__main__":
    idn=read(sys.argv[1] if len(sys.argv)>1 else None, IDN)
    mys=read(sys.argv[2] if len(sys.argv)>2 else None, MYS)
    output=Path(__file__).resolve().parents[1]/"public/blue-education/kepri-atlas.svg"
    output.write_text(build(idn,mys))
    print(output)
