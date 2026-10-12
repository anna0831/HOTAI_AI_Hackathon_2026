# 去趣 eSIM × Offline AI Travel Companion｜首爾五日行程圖片維護與新增手冊

本文件提供「首爾 5 日亮點和守護包收錄焦點」景點照片與路線圖的管理方式。透過統一的 **Image Manifest** 架構，您日後只需將照片放置於指定靜態資產目錄，網頁與離線守護包即會自動載入並進行本機快取。

---

## 1. 靜態資產目錄結構

所有首爾行程圖片統一集中管理於 `public/images/seoul/`：

```text
public/images/seoul/
├── attractions/                     # 9 處代表性景點照片（WebP 格式）
│   ├── airport.webp                 # 仁川國際機場（Day 1 景點、Day 5 封面與景點）
│   ├── hongdae.webp                 # 弘大商圈街區（Day 1 封面與景點、Day 5 景點）
│   ├── gyeongbokgung.webp           # 景福宮（Day 2 封面與景點）
│   ├── bukchon.webp                 # 北村韓屋村（Day 2 景點）
│   ├── ikseondong.webp              # 益善洞韓屋村（Day 2 景點）
│   ├── seongsu.webp                 # 聖水洞潮流聚落（Day 3 封面與景點）
│   ├── seoul-forest.webp            # 首爾林綠意步道（Day 3 景點）
│   ├── myeongdong.webp              # 明洞商圈購物街（Day 4 景點）
│   └── n-seoul-tower.webp           # 南山首爾塔（Day 4 封面與景點）
└── routes/                          # 5 日行程路線預覽圖（已轉檔為 WebP）
    ├── day1.webp                    # Day 1：仁川機場 → 弘大 (1672×941)
    ├── day2.webp                    # Day 2：景福宮 → 北村 → 益善洞 (1672×941)
    ├── day3.webp                    # Day 3：聖水洞 → 首爾林 (1672×941)
    ├── day4.webp                    # Day 4：明洞 → 南山首爾塔 (1672×941)
    └── day5.webp                    # Day 5：弘大 → 仁川機場 (1672×941)
```

> [!NOTE]
> 重複使用之景點（例如弘大、仁川機場）共用同一份資產，不重複建立多份圖檔，節省手機儲存空間與下載流量。

---

## 2. 五日行程圖片配置對應表

| 天數 | 區域主題 | 16:9 封面照片 | 景點照片清單 (水平輪播) | 路線圖路徑 (今日路線 Tab) |
|---|---|---|---|---|
| **Day 1** | 仁川機場 → 弘大 | `hongdae.webp` | `airport.webp`、`hongdae.webp` | `routes/day1.webp` |
| **Day 2** | 景福宮、北村、益善洞 | `gyeongbokgung.webp` | `gyeongbokgung.webp`、`bukchon.webp`、`ikseondong.webp` | `routes/day2.webp` |
| **Day 3** | 聖水洞、首爾林 | `seongsu.webp` | `seongsu.webp`、`seoul-forest.webp` | `routes/day3.webp` |
| **Day 4** | 明洞、南山首爾塔 | `n-seoul-tower.webp` | `myeongdong.webp`、`n-seoul-tower.webp` | `routes/day4.webp` |
| **Day 5** | 弘大 → 仁川機場 | `airport.webp` | `hongdae.webp`、`airport.webp` | `routes/day5.webp` |

---

## 3. 如何新增或替換景點照片

### 步驟 1：準備圖片檔案
- **格式推薦**：`.webp`（畫質好且檔案體積小）
- **建議比例**：
  - 封面照片：16:9（橫式，例如 1280×720 或 1920×1080）
  - 輪播照片：4:3 或 16:9（例如 800×600）
- 若您手上有 JPG 圖檔，可使用專案內建轉換指令：
  ```bash
  python3 scripts/convert_images.py
  ```

### 步驟 2：放入目標目錄
將檔案放入 `public/images/seoul/attractions/{檔名}.webp`。

### 步驟 3：調整 Image Manifest（若檔名或名稱變更）
開啟 `src/data/seoulImageManifest.ts`：
```typescript
{
  id: 'dayX-myattraction',
  attractionName: '景點繁中名稱',
  imagePath: '/images/seoul/attractions/myattraction.webp',
  altText: '清晰無障礙描述文字',
  imageCredit: '提供者或授權來源',
}
```
存檔後前端熱重載（Hot Reload）即會自動載入最新圖片。

---

## 4. 如何新增或替換每日路線圖

當您準備好 5 張每日路線預覽地圖時：

1. 將路線圖檔命名為：
   - `day1.webp`
   - `day2.webp`
   - `day3.webp`
   - `day4.webp`
   - `day5.webp`
2. 存入目錄：`public/images/seoul/routes/`
3. 頁面切換至「今日路線」Tab 時，將自動由「路線圖片準備中 Placeholder」無縫切換為「完整路線地圖」。
4. 點擊路線圖即可開啟 Lightbox 全螢幕放大檢視，圖片採用 `object-fit: contain` 確保文字與路線絕不裁切。

---

## 5. 離線 Travel Companion 快取機制

本專案實作 Offline-first 圖片快取支援：

1. **快取容器**：瀏覽器 `CacheStorage`（快取名稱：`chictrip-offline-v2`）。
2. **自動預載觸發點**：
   - **App 啟動時**：呼叫 `cacheSeoulItineraryAssets()`，自動檢查並快取本機已存在的 9 張景點照片與 5 張路線圖（共 14 張）。
   - **購買解鎖守護包時**：點擊「立即下載守護包至本機」時，背景並行快取五日行程照片與完整路線圖。
3. **只快取實際存在檔案**：
   - 僅當 HTTP 狀態為 200 時才寫入 CacheStorage。
   - 404 不會寫入錯誤回應，絕不污染快取庫。
4. **離線安全降級**：
   - 離線保護模式下（Offline），不會向外部網路發出圖片請求。
   - 若某圖片未下載或檔案遺失，自動渲染優雅的 `ImagePlaceholder`，保證 React 畫面絕不崩潰、其他行程資訊完整可讀。

---

## 6. 常見問題與排錯 (FAQ)

### Q1：放入新圖片後，瀏覽器離線模式仍看到舊圖？
請在開發人員工具（DevTools）→ **Application** → **Storage** 中點擊 **Clear site data**，或於 Service Worker 標籤點擊 **Update** / **Unregister** 後重新整理。

### Q2：若路線圖暫時尚未產出？
無需擔心，系統內建完整的 `ImagePlaceholder` 備援元件，會自動顯示「路線圖片準備中」，並附帶當日完整行程順序與時間地點軸，不影響任何功能操作與 Demo 展示。
