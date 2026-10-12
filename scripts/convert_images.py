import os
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIRS = [
    os.path.join(BASE_DIR, 'assets', 'source-images'),
    BASE_DIR,
]
DEST_ATTRACTIONS = os.path.join(BASE_DIR, 'public', 'images', 'seoul', 'attractions')
DEST_ROUTES = os.path.join(BASE_DIR, 'public', 'images', 'seoul', 'routes')

os.makedirs(DEST_ATTRACTIONS, exist_ok=True)
os.makedirs(DEST_ROUTES, exist_ok=True)

IMAGE_MAPPING = [
    (['機場.jpg'], 'airport.webp'),
    (['弘大(1).jpg', '弘大.jpg'], 'hongdae.webp'),
    (['景福宮.jpg'], 'gyeongbokgung.webp'),
    (['北村.jpg'], 'bukchon.webp'),
    (['益善洞.jpg'], 'ikseondong.webp'),
    (['聖水洞.jpg'], 'seongsu.webp'),
    (['首爾林.jpg'], 'seoul-forest.webp'),
    (['明洞.jpg'], 'myeongdong.webp'),
    (['南山塔.jpg'], 'n-seoul-tower.webp'),
]

print("=== Converting Seoul Attraction Images ===")
results = []
for src_candidates, dest_filename in IMAGE_MAPPING:
    found_src = None
    for src_dir in SRC_DIRS:
        for cand in src_candidates:
            cand_path = os.path.join(src_dir, cand)
            if os.path.exists(cand_path) and os.path.getsize(cand_path) > 0:
                found_src = cand_path
                break
        if found_src:
            break
            
    if not found_src:
        print(f"[MISSING] Could not find source image for {dest_filename} (candidates: {src_candidates})")
        continue

    dest_path = os.path.join(DEST_ATTRACTIONS, dest_filename)
    with Image.open(found_src) as img:
        orig_format = img.format
        orig_size = img.size
        # Convert RGB if necessary (e.g. RGBA / CMYK)
        if img.mode in ('RGBA', 'LA'):
            converted = img.convert('RGBA')
        else:
            converted = img.convert('RGB')
        converted.save(dest_path, 'WEBP', quality=88)
        dest_filesize = os.path.getsize(dest_path)
        print(f"[OK] {os.path.basename(found_src)} ({orig_size[0]}x{orig_size[1]}, {orig_format}) -> {dest_filename} ({dest_filesize // 1024} KB)")
        results.append({
            'source': os.path.basename(found_src),
            'dest': dest_filename,
            'dimensions': f"{orig_size[0]}x{orig_size[1]}",
            'size_kb': dest_filesize // 1024
        })

print(f"\nSuccessfully converted {len(results)} of {len(IMAGE_MAPPING)} attraction images to {DEST_ATTRACTIONS}")

ROUTE_MAPPING = [
    (['Day 1 路線圖.png', 'Day 1 路線圖.jpg', 'Day 1 路線圖.webp'], 'day1.webp'),
    (['Day 2 路線圖.png', 'Day 2 路線圖.jpg', 'Day 2 路線圖.webp'], 'day2.webp'),
    (['Day 3 路線圖.png', 'Day 3 路線圖.jpg', 'Day 3 路線圖.webp'], 'day3.webp'),
    (['Day 4 路線圖.png', 'Day 4 路線圖.jpg', 'Day 4 路線圖.webp'], 'day4.webp'),
    (['Day 5 路線圖.png', 'Day 5 路線圖.jpg', 'Day 5 路線圖.webp'], 'day5.webp'),
]

print("\n=== Converting Seoul Route Map Images ===")
route_results = []
for src_candidates, dest_filename in ROUTE_MAPPING:
    found_src = None
    for src_dir in SRC_DIRS:
        for cand in src_candidates:
            cand_path = os.path.join(src_dir, cand)
            if os.path.exists(cand_path) and os.path.getsize(cand_path) > 0:
                found_src = cand_path
                break
        if found_src:
            break

    if not found_src:
        print(f"[MISSING] Could not find route map for {dest_filename} (candidates: {src_candidates})")
        continue

    dest_path = os.path.join(DEST_ROUTES, dest_filename)
    with Image.open(found_src) as img:
        orig_format = img.format
        orig_size = img.size
        if img.mode in ('RGBA', 'LA'):
            converted = img.convert('RGBA')
        else:
            converted = img.convert('RGB')
        converted.save(dest_path, 'WEBP', quality=90)
        dest_filesize = os.path.getsize(dest_path)
        print(f"[OK] {os.path.basename(found_src)} ({orig_size[0]}x{orig_size[1]}, {orig_format}) -> {dest_filename} ({dest_filesize // 1024} KB)")
        route_results.append({
            'source': os.path.basename(found_src),
            'dest': dest_filename,
            'dimensions': f"{orig_size[0]}x{orig_size[1]}",
            'size_kb': dest_filesize // 1024
        })

print(f"\nSuccessfully converted {len(route_results)} of {len(ROUTE_MAPPING)} route images to {DEST_ROUTES}")

