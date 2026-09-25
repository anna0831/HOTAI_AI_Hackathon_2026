# CHANGELOG

## [0.2.0] - 2026-09-25 (Milestone 1: 去趣 chicTrip 官方品牌視覺改版 & Klook 競品定位)

### Added
- **去趣 chicTrip 品牌設計系統 (Design Tokens)**：
  - 建立集中式標準 Tokens `src/theme/tokens.ts`：`chicBlue (#00AEEF)`、`chicYellow (#FFC400)`、`promoOrange (#FF8614)`、`ink (#171B28)`、`navy (#143D5C)`、`surface (#F4F7FB)`、`white (#FFFFFF)`。
  - 全站升級為大面積簡潔白底、高對比墨黑字體與 16~24px 柔和圓角陰影卡片。
- **全站共用元件模組**：
  - `ChicHeader.tsx`：去趣官方視覺標準 Header（品牌文字、Logo 意象、黑客松標記）。
  - `OfflineStatusBar.tsx`：簡潔輕量化網路環境模擬膠囊（4G/5G 線上、弱網、離線保護）。
  - `ChicBottomNav.tsx`：90 秒展示步進導覽器，手機與桌機完整響應。
  - `DestinationCard.tsx`：圓形國旗與目的地卡片（首爾 5 日示範、東京、曼谷、花東）。
  - `TravelDNAResultCard.tsx`：具備社群轉發質感之旅人人格分享卡。
  - `EsimPlanCard.tsx`：優先呈現「為什麼適合您」之行程契合度解釋與透明促銷價。
  - `FreshnessBadge.tsx`：亮色系時效狀態標籤（離線本機檢索、最新即時動態、待連線排隊、誠實未收錄）。
  - `SourceCard.tsx`：清晰可信之資料來源引據卡片（標記同步日期與權重分）。
  - `PrimaryCTA.tsx`：符合無障礙觸控標準（高度 48px+）之核心操作按鈕。
  - `SectionHeading.tsx`：統整全站標題與層級樣式。
  - `MetricCard.tsx`：清楚標示【已實作】、【測試通過】與【目標假說 (Mock)】之指標卡。
- **Klook 競品差異化專區 (Evidence Page)**：
  - 客觀評估 Klook 既有優勢（SKU 規模、成交評價、即買即取、交叉銷售）。
  - 明確界定去趣避開正面競爭之面向（不打最低價割喉、不打 SKU 數量戰）。
  - 突顯去趣 5 大核心優勢：Travel DNA 意圖推薦、決策解釋性、Offline Companion 旅中加值、可信來源回答與時效閘道、旅後 UGC 分享閉環。

### Changed
- 重構 8 大全流程頁面：
  - `/`：首屏「接下來，要去哪旅行？」、目的地圓形卡與即時 Travel DNA 入口。
  - `/result`：旅人畫像卡與清晰 CTA。
  - `/trip`：行程痛點與弱網風險分析。
  - `/esim`：去趣商品卡視覺，強化推薦理由。
  - `/pack`：以「購買後專屬解鎖」語氣呈現 680 KB 本機快取。
  - `/companion`：明亮通訊介面，直觀離線檢索與時效性安全攔截。
  - `/share`：適合截圖與限動分享之 Travel Card（標記 Demo 示範優惠）。
  - `/evidence`：重組 4 大標籤頁（漏斗與 KPI、Klook 比較、架構評分、會議提問）。
- 保持全數 17 項單元與整合測試 100% 通過。
- 達成 `oxlint` 0 warnings 0 errors。

---

## [0.1.0] - 2026-09-25 (Milestone 0)

### Added
- 初始化 React 19 + Vite 8 + TypeScript + Tailwind CSS 專案骨架。
- 建立專屬規格文件 `SPEC.md` 與商業技術假設 `ASSUMPTIONS.md`。
- 建立完整 Domain 型別定義：`trip.ts`, `pack.ts`, `query.ts`, `events.ts`。
- 建立標準 Mock JSON 資料集（全數明確標記 `mock: true`）。
- 建立核心服務介面與檢索引擎。
- 建立 8 大完整 Funnel 頁面。
- 建立 17 組單元測試並全數通過。
