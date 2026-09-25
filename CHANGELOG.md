# CHANGELOG

## [0.1.0] - 2026-09-25 (Milestone 0)

### Added
- 初始化 React 19 + Vite 8 + TypeScript + Tailwind CSS 專案骨架。
- 建立專屬規格文件 `SPEC.md` 與商業技術假設 `ASSUMPTIONS.md`。
- 建立完整 Domain 型別定義：`trip.ts`, `pack.ts`, `query.ts`, `events.ts`。
- 建立標準 Mock JSON 資料集（全數明確標記 `mock: true`）：
  - `trip.json`: Anna 首爾 5 日示範行程。
  - `esim_plans.json`: 3 款 eSIM 方案（總量/每日/吃到飽）與情境化推薦理由。
  - `pack_manifest.json`: 680 KB 離線守護包中繼規格。
  - `knowledge_items.json`: 8 類精選本機知識項目（涵蓋機場交通、弘大門牌、景福宮、聖水洞、eSIM排錯、緊急電話、韓語短句）。
- 建立核心服務介面與引擎：
  - `localPackStore.ts`: 本機 LocalStorage 快取與持久化。
  - `queryClassifier.ts`: 即時詞與情境意圖分類器。
  - `localRetrieval.ts`: BM25-like 加權比對與 Top-K 模板檢索引擎。
  - `onlineAdapter.ts`: 線上即時模擬適配器。
  - `queryRouter.ts`: 離線安全閘道與路由調度器。
  - `analytics.ts`: 漏斗事件追蹤與指標計算。
- 建立 8 大完整 Funnel 頁面與導覽：
  - `/`: CampaignLandingPage
  - `/result`: TravelProfilePage
  - `/trip`: TripOverviewPage
  - `/esim`: EsimRecommendationPage
  - `/pack`: PackBuilderPage
  - `/companion`: CompanionPage
  - `/share`: TravelCardPage
  - `/evidence`: EvidencePage
- 建立行動裝置展示框 `MobileFrame`、連線環境模擬器 `ConnectionStatus`、90 秒展示步進器 `DemoStepper`。
- 建立完整測試套件（15+ 組測試）：
  - `queryClassifier.test.ts`
  - `localRetrieval.test.ts`
  - `queryRouter.test.ts`
