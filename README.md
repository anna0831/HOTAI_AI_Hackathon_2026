# 去趣 eSIM × Offline AI Travel Companion (Growth Funnel Decision Prototype)

> **2026 和泰 AI 黑客松** 初賽提案原型｜可操作 Demo 雛形  
> **核心論點 (Winning Thesis)**：去趣將「你的旅行型態」轉成最適 eSIM 與專屬旅程服務：行前以 GenAI 互動精準導購，購買後解鎖個人化 Offline Travel Pack (Killer Benefit)，旅途中無網依然守護，旅後再生成可分享內容，形成 **曝光 → 轉換 → 服務 → 口碑** 的成長飛輪。

---

## 1. 專案定位與提案流程

### 專案定位
**「去趣 eSIM × Offline AI Travel Companion」**

本專案並非去趣 App 的全功能替代品，而是一個專注於商業驗證的 **Growth Funnel Decision Prototype（成長漏斗決策原型）**。  
核心目標是驗證：能否透過行前的個人化旅人互動蒐集旅客意圖，精準推薦最適 eSIM 方案；並以**「離線旅程守護包」作為購買去趣 eSIM 的核心差異化價值（Killer Benefit）**，在旅客落地無網或斷網時提供可信的本機導引；旅後再藉由自動生成的 Travel DNA 限動卡形成社群口碑擴散（UGC Referral Loop）。

> **網路架構聲明**：本原型已移除早期探索的弱網模式，全面純化為 **有網路（Online）** 與 **離線保護模式（Offline）** 兩種狀態，以符合旅客「有網路即時查」與「斷網本機守護」的真實使用情境。無論是透過 Wi-Fi 或是行動網路，只要具備連線能力皆可使用線上即時功能。

### 提案端到端流程與實作現況核對

本專案提案規劃之完整端到端流程如下，各環節均逐項核對目前程式碼實作：

```text
[01 旅遊偏好] ──▶ [02 個人化行程與替代候選] ──▶ [03 eSIM 方案推薦]
       │                         │                         │
     已實作                   部分規劃                   已實作展示
       ▼                         ▼                         ▼
[04 購買解鎖守護包] ──▶ [05 在線上下載] ──▶ [06 離線查看行程與內建問答] ──▶ [07 Travel DNA 分享卡]
       │                         │                         │                         │
 模擬購買（規劃）        已實作（Demo自動預載）           已實作                    已實作
```

| 提案流程環節 | 說明 | 程式實作狀態 | 備註說明 |
|---|---|---|---|
| **1. 旅遊偏好蒐集** | 選擇目的地、期待旅遊方案（支援複選）及海外上網習慣 | **已實作** | 由首頁 `/` 蒐集 First-party Intent，支援多選條件 |
| **2. 個人化行程與替代候選** | 依偏好產生行程摘要，並提供備用替代候選景點 | **行程展示（已實作）**<br>**替代候選（規劃）** | 目前展示首爾 5 日示範行程（標記「已儲存行程」）；動態產生「替代候選方案」為規劃中功能 |
| **3. eSIM 方案推薦** | 依行程情境推薦最適方案（如每日 2GB）與決策解釋理由 | **已實作展示（模擬資料）** | 資料來自 `src/data/esim_plans.json`，標記 `mock: true` |
| **4. 購買解鎖個人守護包** | 確認選購方案並取得專屬守護包下載資格 | **模擬購買（規劃）** | **無真實金流付款**；尚未實作購買驗證，前端無付費路由守衛（Route Guard），購買後解鎖仍屬規劃中的商業規則 |
| **5. 在線上下載** | 於線上環境將守護包資料與分享卡素材快取至本機 | **已實作（Demo 自動預載）** | 為確保初賽展示順暢，系統啟動時會**自動預載預設守護包**；介面上的「立即下載」按鈕為流程互動示範，**不能作為首次取得離線資料的證明** |
| **6. 離線查看行程與問答** | 斷網時由本機秒查行程、住宿與交通，即時問題安全攔截 | **已實作** | 本機 BM25-like 演算法檢索，離線嚴格不聯網、不產生時效幻覺 |
| **7. Travel DNA 分享卡** | 旅後生成帶有示範推薦碼的分享圖卡與 9:16 限動卡 | **已實作** | Canvas 動態匯出 1080×1920 PNG，支援系統分享與文案複製 |

---

## 2. 目前功能盤點

以下依程式碼實際狀態嚴格區分「已實作」、「模擬」、「預製素材」與「規劃」，不將 adapter 介面或預留架構宣稱為已串接完成：

| 功能項目 | 實作狀態 | 對應模組／程式碼位置 | 實作細節與行為說明 |
|---|---|---|---|
| **旅遊期待複選與舊資料遷移** | **已實作** | `src/data/travelVibes.ts`<br>`src/pages/CampaignLandingPage.tsx` | 支援 4 種旅遊方案複選切換；`migrateSelectedVibes` 函式能將舊版單一字串或空值安全遷移為字串陣列，避免舊資料結構報錯。 |
| **Travel Profile／Travel DNA** | **已實作**（規則引擎） | `src/data/travelVibes.ts`<br>`src/pages/TravelProfilePage.tsx` | 依所有選取的期待方案組合，經規則函式 `buildProfileFromVibes` 動態運算產生旅人標題（如「城市探險型旅人」）、標籤群及 Tagline，非隨機或僅取首項。 |
| **行程洞察與「已儲存行程」** | **已實作展示**（模擬資料） | `src/pages/TripOverviewPage.tsx`<br>`src/data/trip.json` | 呈現首爾 5 日示範行程，明確標示「已儲存行程」狀態標籤、每日行程重點及抵達仁川機場第一時間尚未連網的痛點洞察。 |
| **eSIM 方案推薦** | **已實作展示**（模擬資料） | `src/pages/EsimRecommendationPage.tsx`<br>`src/data/esim_plans.json` | 根據行程推薦「韓國 5 日・每日 2GB 高速型」，提供情境化推薦理由與促購訊息；資料皆標記 `mock: true`。 |
| **守護包與實際內建問題數量** | **已實作**（含 Demo 自動預載） | `src/data/pack_manifest.json`<br>`src/data/companionQuestions.ts`<br>`src/App.tsx` | 守護包大小為 680 KB，收錄 6 大離線常備模組。App 啟動時自動預載以確保 Demo 可操作。經 `getPackBuiltinQuestionsCount` 去重計算，**實際綁定離線守護包之內建問題為 8 題**，另有 2 題即時問題，總計 10 題。 |
| **離線可用／需要網路雙色問題卡** | **已實作** | `src/components/CompanionPage.tsx`<br>`src/data/companionQuestions.ts` | 依連線與下載狀態動態判定：離線問題下載後顯示淡綠色「離線可用」（可點擊）；即時問題於有網路時顯示淡橘色「需要網路」（可點擊），離線顯示「連線後可查詢」（不可點擊並提示警告）。 |
| **三張 Travel DNA 限動分享卡** | **已實作**（預製素材） | `src/data/travelDnaCards.ts`<br>`src/components/TravelDnaStoryCards.tsx` | 提供首爾、大阪、北海道三款 9:16 範例卡切換；背景為預先生成之本地 WebP 圖片，標註 Prototype Generated Assets。 |
| **1080 × 1920 PNG 下載** | **已實作** | `src/services/travelCardCanvas.ts` | 使用 HTML5 Canvas 動態繪製 1080 × 1920 高解析度圖卡，支援離線 Blob 圖片載入、文字陰影與精準排版，輸出 PNG 檔案。 |
| **系統分享與複製文案** | **已實作** | `src/pages/TravelCardPage.tsx`<br>`src/components/TravelDnaStoryCards.tsx` | 支援 `navigator.clipboard` 複製文案，以及 Web Share API (`navigator.share`) 呼叫系統分享。若使用者取消分享（`AbortError`），安全攔截且不誤報成功。 |
| **Service Worker 與本地快取** | **已實作** | `public/sw.js`<br>`src/services/localPackStore.ts`<br>`src/services/offlineAssetCache.ts` | Service Worker 攔截導航提供離線 SPA 頁面；`localStorage` 儲存守護包 JSON；`CacheStorage` 預先快取 Travel DNA 背景圖片。 |
| **真實金流與購買驗證** | **規劃** | — | 目前為點擊方案的「模擬購買」，尚未介接第三方支付或會員訂單系統；「購買後解鎖」仍為規劃中的商業規則，尚未實作購買驗證與路由阻擋。 |
| **Experience Twin 行程與替代推薦** | **規劃** | — | 規劃在線上環境依動態情境計算替代候選景點，離線讀取預存結果；目前尚未串接演算法。 |
| **即時外部 API (天氣/列車/匯率)** | **模擬** | `src/services/onlineAdapter.ts` | 使用前端類比服務（模擬 300ms 延遲與固定回覆資料），尚未串接韓國氣象廳或 AREX 官方 API。 |
| **即時文字生成圖片 API** | **規劃**（Adapter 介面） | `src/services/imageGenerationAdapter.ts` | 保留擴充 Adapter 介面，Demo 階段完全不呼叫外部生圖服務，優先使用本地預製素材。 |

---

## 3. 釐清功能差異與三個獨立狀態

### A. 購買前／購買後的服務差異表

> **重要說明**：在目前的 Prototype 程式中，使用者點擊方案後即可進入下載頁面。**「購買後解鎖」屬於規劃中的商業規則**，前端尚未實作購買狀態驗證與路由阻擋守衛（Route Guard），展示時以模擬購買流程呈現。

| 功能維度 | 購買去趣 eSIM 前（訪客／瀏覽階段） | 購買去趣 eSIM 後（模擬購買／已選購階段） |
|---|---|---|
| **Travel DNA 測驗與結果** | 可自由體驗測驗，查看個人旅行人格與標籤 | 測驗結果保留，並與後續行程深度綁定 |
| **行程檢視與洞察** | 可瀏覽首爾 5 日示範行程與痛點分析 | 行程已儲存，作為生成專屬守護包之資料來源 |
| **eSIM 方案導購** | 可查看情境化推薦方案、理由與促銷訊息 | 方案已選定（如每日 2GB 高速型） |
| **離線守護包下載權限** | 尚未獲得解鎖（規劃中商業規則需完成購買） | **解鎖 680 KB 專屬守護包下載按鈕**（模擬購買後） |
| **離線問答資料庫** | 若未下載守護包，離線問題顯示「請先下載守護包」 | 可將守護包資料完整持久化儲存於本機 |
| **旅後分享卡與推薦碼** | 僅能預覽基礎示範圖卡 | 產生個人專屬旅程回憶卡與示範推薦碼（`CHIC-ANNA-KR`） |

---

### B. 有網路 (Online)／離線 (Offline) 的功能差異表

| 功能維度 | 有網路（Online）<br>*(支援 Wi-Fi 或行動網路)* | 離線保護模式（Offline）<br>*(無網路連線)* |
|---|---|---|
| **常備行程與個人問題**<br>*(住宿、AREX 路線、eSIM 排錯等 8 題)* | 可正常查詢；由本機檢索秒回，顯示資料來源與時間 | **完全可用**；由本機檢索秒級回答，標記「已使用離線旅程包」，**不發出任何網路請求** |
| **時效性即時問題**<br>*(即時延誤、即時氣溫、即時匯率等 2 題)* | **支援即時查詢**；由 `onlineAdapter` 回傳最新動態（模擬資料），標記「已取得最新資訊」 | **嚴格安全攔截**；絕不拿過期舊資料亂答，自動排入「待連線清單」，標記「時效性安全閘道」 |
| **待連線問題處理** | 若先前曾累積佇列，提示「網路已恢復」，可一鍵更新取得最新資訊 | 自動加入待連線佇列，顯示提醒通知，等待連線恢復 |
| **未收錄於守護包之問題** | 透過線上通用 Adapter 回覆基本指引 | **誠實退避 (Honest Fallback)**；明確告知守護包未收錄，不猜測、不產生幻覺 |
| **頁面重整 (Refresh)** | 正常由網路或快取載入最新檔案 | **依賴 Service Worker 快取**；可離線重整並維持 SPA 運作 |
| **Travel DNA 分享卡 PNG 匯出** | 正常下載 1080×1920 PNG | **支援離線下載**；只要先前已快取圖片至 `CacheStorage`，即可離線讀取 Blob 並繪製匯出 |

---

### 三個獨立狀態（正交維度）

本系統由三個彼此獨立的狀態維度構成，不可混為一談：

```text
1. 購買狀態 (Purchase State)  ──▶ [ 尚未購買 ] vs. [ 已模擬選購 eSIM ] （商業授權維度）
2. 下載狀態 (Pack State)      ──▶ [ 尚未下載 ] vs. [ 已下載至本機 Storage ] （本地快取維度）
3. 連線狀態 (Network State)   ──▶ [ 有網路（Online） ] vs. [ 離線保護模式（Offline） ] （網路環境維度）
```

### 關鍵觀念澄清

1. **購買 eSIM 不代表永遠有網路**：  
   旅客即使購買了 eSIM，在飛機剛降落仁川機場、滑行尚未開通漫遊、通過海關地下室或深入山區時，隨時可能遇到無訊號斷網。這正是購買 eSIM 贈送「離線旅程守護包」作為 Killer Benefit 的核心價值所在。
2. **沒購買去趣 eSIM，仍可透過其他網路使用線上功能**：  
   若使用者未購買去趣 eSIM，只要連上飯店/機場公用 Wi-Fi 或其他行動網路，依然可以使用線上即時查詢服務。去趣守護包並非限制上網，而是作為防斷網的加值保險。
3. **預設守護包自動預載與下載按鈕定位**：  
   在目前的 Prototype 實作中，為了保證初賽展示與評審體驗順暢，系統於 `src/App.tsx` 啟動時即會**自動預載預設守護包**（`localPackStore.ensureDefaultPack()`）。因此，`/pack` 頁面上的「立即下載」按鈕主要提供流程展示、重置狀態與手動重快取示範，**不能作為首次取得離線資料的嚴密技術證明**。正式產品中，個人化內容必須在出發前連線時由使用者正式觸發下載並成功寫入本機。
4. **分享卡素材快取與個人守護包下載是不同機制**：  
   - **個人守護包下載**：由 `localPackStore.ts` 處理，將結構化 JSON（行程文字、住宿地址、eSIM 排錯指南、緊急電話）儲存於 `localStorage`。
   - **分享卡素材快取**：由 `offlineAssetCache.ts` 與 Service Worker (`public/sw.js`) 處理，將 3 張 9:16 的 WebP 背景圖檔儲存於瀏覽器的 `CacheStorage`。

---

## 4. AI 與資料流程

本專案對技術架構採取誠信與嚴謹原則，清楚界定各技術角色：

```text
使用者輸入 Query
      │
      ▼
Query Classifier (關鍵字模式分類器)
      ├─ real_time (時效性) ──┬─ Online (有網路) ─▶ Online Adapter (模擬延遲 300ms 回傳即時動態)
      │                       └─ Offline (離線)   ─▶ 安全攔截排入佇列 (Queued，拒絕舊資料幻覺)
      │
      ├─ personal / stable ───▶ Local Retrieval (本機 BM25-like 計分 0ms 檢索)
      │                                ├─ 找到資料 ──▶ 回傳答案並附來源引用卡 (offline_local)
      │                                └─ 未達閥值 ──▶ 誠實退避提示未收錄 (not_found)
      │
      └─ unknown (超出範圍) ───▶ 提示超出守護包服務範圍，不胡言亂語
```

### 1. LLM 的實際角色：目前未呼叫模型，採本機規則與檢索
- **現況**：本 Prototype **完全未在線上或端側呼叫任何 LLM API**（如 OpenAI、Gemini 或端側 WebLLM）。
- **運作機制**：所有問答均由前端本機的分類器 (`queryClassifier.ts`) 進行時效性規則過濾，並由 BM25-like 權重計分演算法 (`localRetrieval.ts`) 比對關鍵字與字元 n-gram，從預置的知識庫中抽取最相關段落組合回答。
- **原則**：**避免將一般離線關鍵字搜尋或固定問答稱為「裝置端 LLM」**。此架構保證了極致的啟動速度（<2ms）、零運算資源負擔與零模型幻覺。

### 2. Experience Twin：目前為規劃架構，Demo 尚未串接
- **現況**：**尚未串接真實 Experience Twin 模型**。
- **規劃設計**：未來規劃在線上環境由 Experience Twin 依旅客行前偏好動態生成主行程與備用替代候選（例如雨天備案、人潮擁擠替代方案）；離線時則由離線守護包直接讀取預先編譯好的預存結果。目前展示使用靜態 `trip.json` 與規則產生的旅人畫像。

### 3. 圖像生成：Demo 使用預製背景，非即時生成
- **現況**：展示時**不即時調用生圖模型**，亦無串接線上生圖 API。
- **素材來源**：背景圖片為專案建置時使用 Antigravity 內建生圖工具預先生成之 3 款 9:16 本地 WebP 資產（標記為 Prototype Generated Assets）。在未確認底層確切生成模型前，**不宣稱由 SDXL、FLUX 或特定 Diffusion 模型產生**。

### 4. 前端 Canvas 渲染：動態疊加文字與推薦碼
- **現況**：背景圖純淨無文字。所有繁體中文內容（旅人姓名 Anna、旅行 DNA 稱號、金句、標籤、示範推薦碼及免責宣告）皆由前端 `travelCardCanvas.ts` 動態排版、繪製遮罩，並匯出為 1080 × 1920 PNG。

---

## 5. Travel DNA 限動分享卡

在 `/share` 頁面提供 3 款 9:16 規格的 Travel DNA 範例限動卡，專為 Instagram Stories 及 Threads 排版設計：

| 範例款式 | 目的地 | 視覺方向與相對路徑 | 示範推薦碼 | 主題代表色 |
|---|---|---|---|---|
| **A. 城市探險型** | 首爾 (Seoul) | 街景、特色咖啡店、現代建築<br>`public/images/travel-dna/urban-seoul.webp` | `DEMO-SEOUL` | `#00AEEF` (Chic 藍) |
| **B. 美食療癒型** | 大阪 (Osaka) | 街頭美食、復古燈籠小巷、暖心店鋪<br>`public/images/travel-dna/food-osaka.webp` | `DEMO-OSAKA` | `#FF8614` (暖橘) |
| **C. 自然慢遊型** | 北海道 (Hokkaido) | 松林、山海連綿、清爽寧靜自然風景<br>`public/images/travel-dna/nature-hokkaido.webp` | `DEMO-HOKKAIDO` | `#18B46B` (翠綠) |

> 相關資產設定與生成提示詞可參閱內部說明文件：[ASSETS_INFO.md](public/images/travel-dna/ASSETS_INFO.md)

### 關鍵設計與注意事項

1. **標註 Prototype Generated Assets**：卡片預覽與下載檔案上方皆清楚標記此素材為競賽原型預製資產。
2. **示範推薦碼無實際優惠**：卡片上之推薦碼（如 `DEMO-SEOUL`、`DEMO-OSAKA`，以及正式卡之 `CHIC-ANNA-KR`）皆明確標註**「示範推薦碼，無實際優惠」**，避免使用者混淆。
3. **背景缺失時啟動漸層備援**：若本地圖片因網路異常或檔案缺失導致載入失敗，系統將自動啟動對應主題色的 CSS / Canvas 漸層備援，並顯示「背景圖待補」標籤，確保分享卡預覽與 1080 × 1920 PNG 匯出功能依然正常運作。
4. **系統分享不等於已發布至 Threads / Instagram**：呼叫 `navigator.share` 僅為觸發行動裝置作業系統之原生分享選單，發布動作由使用者自行在目標 App 內確認。若使用者取消或瀏覽器不支援，系統將提示使用「下載分享卡」或「複製推薦文案」。
5. **固定範例與正式個人化卡片的實作差異**：
   - **正式首爾旅程回憶卡**（`/share` 頂部主要卡片）：依使用者於測驗所產生的 `travelProfile` 與首爾 5 日行程動態組合內容，推薦碼為 `CHIC-ANNA-KR`。
   - **3 款 Travel DNA 限動卡**（`/share` 下方切換器）：為展示不同旅行風格（首爾、大阪、北海道）與 1080×1920 匯出能力之預製示範卡。

---

## 6. 安裝、執行與驗證

本專案使用 Vite 搭配 React 19、TypeScript 與 TailwindCSS v4 開發。

### 實際可用指令（依 package.json）

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動本機開發伺服器 (預設開啟 http://localhost:5173/)
npm run dev

# 3. 執行 TypeScript 型別檢查
npm run typecheck

# 4. 執行程式碼檢查 (Oxlint)
npm run lint

# 5. 執行單元與整合測試 (Vitest)
npm run test

# 6. 建置正式生產版本 (輸出至 dist/)
npm run build

# 7. 預覽正式生產版本 (預設開啟 http://localhost:4173/)
npm run preview
```

> **測試範圍說明**：自動化測試涵蓋本機檢索演算法（BM25-like）、時效性意圖分類、離線路由閘道與佇列重試、旅遊期待複選資料遷移，以及旅伴內建問題去重與連線需求標籤驗證。

---

### 正式建置版離線驗證步驟（操作方法指南）

為驗證 Service Worker、本地快取與離線檢索在正式生產環境中的完整性，請依以下步驟操作：

1. **線上建置與開啟**：
   ```bash
   npm run build
   npm run preview
   ```
   使用 Chrome 或 Edge 開啟預覽網址（例如 `http://localhost:4173/`）。
2. **在線完成下載與快取**：
   - 於首頁完成測驗，一路前進至 `/pack`（旅程守護包頁面）。
   - （說明：Prototype 啟動時已由程式自動預載預設資料供 Demo 操作；點擊「**立即下載守護包至本機 (680 KB)**」將重新確保寫入 `localStorage`，同時觸發 Service Worker 快取 Travel DNA 背景素材至 `CacheStorage`）。
3. **執行真正斷網**：
   - 開啟瀏覽器開發者工具（F12）切換至 **Network** 標籤，將網路節流下拉選單選取為 **Offline**；或直接關閉電腦的 Wi-Fi 連線。
4. **重新整理頁面 (Hard Refresh)**：
   - 於真正斷網狀態下按下重新整理（Cmd+R / Ctrl+F5），驗證 Service Worker 能成功攔截並回傳快取頁面，畫面不出現連線失敗或錯誤頁。
5. **驗證離線功能**：
   - 前往 `/companion`：點擊「✈️ 機場到弘大交通」，驗證本機毫秒級回答；點擊「🌤️ 現在首爾幾度？」，驗證系統不連網並安全攔截排入佇列。
   - 前往 `/share`：切換 3 款 Travel DNA 限動卡，點擊「下載分享卡 (1080×1920)」，驗證在斷網下依然能透過 `CacheStorage` 載入圖片並成功匯出 PNG。

> **免責說明**：上述內容為推薦之操作驗證方法。由於各瀏覽器之 Service Worker 策略及儲存空間限制可能因作業系統與隱私設定而異，實際離線效果以各環境之執行狀況為準。

---

## 7. 限制與後續工作

本原型如實列出目前系統之限制與後續產品化待辦事項：

1. **尚未實作購買驗證與真實金流**：目前無真實付款、信用卡或 LINE Pay 串接，尚未驗證去趣會員真實訂單。購買流程為展示性模擬，購買後解鎖權限仍屬規劃中的商業規則，前端尚未實作購買狀態驗證與路由阻擋。
2. **尚未串接即時模型與即時資料 API**：未串接雲端 LLM（如 Gemini API）或 Experience Twin 行程推薦引擎；天氣、列車延誤與匯率等即時資料目前由 `onlineAdapter.ts` 模擬，尚未接入韓國氣象廳或 AREX 官方 API。
3. **尚未串接即時圖片生成 API**：Travel DNA 背景圖目前使用預先生成之 3 款 WebP 本地檔案，尚未串接即時文字生成圖片之線上服務。
4. **離線資料時效性限制**：離線守護包為靜態預置內容，離線狀態下無法獲取突發之交通延誤、店家臨時公休、最新匯率牌價或即時天氣警報。
5. **本機儲存與快取機制之限制**：
   - **`localStorage` 容量有限**：用於儲存守護包結構化 JSON（行程、住宿、問答知識項目），各瀏覽器容量配額相當有限（通常僅約 5MB 上下），適合小型文字資料，難以擴展至多日跨城市的大型富文本或多媒體資料。
   - **`CacheStorage` 配額依環境而異**：用於儲存 Travel DNA 圖片與離線網站資產，其配額依不同瀏覽器、可用磁碟空間與裝置政策而動態分配（通常可達數十 MB 至數百 MB 不等）。
   - **資料清除與回收風險**：不論是 `localStorage` 或 `CacheStorage`，皆可能因使用者主動清除網站資料、使用無痕/私密瀏覽模式，或是裝置儲存空間不足時由瀏覽器自動進行快取回收逐出（Eviction）而遺失。未來若邁向正式產品化，需評估原生 App 之 SQLite / Realm 本機持久化資料庫方案。
6. **電信開通與 eSIM 供應鏈**：尚未對接真實 eSIM 供應商之 SM-DP+ 伺服器與 QR Code 即時產製流程。

---

## 8. 90 秒標準展示腳本

展示主角：**Anna（首爾 5 日自由行獨旅）**

```
   ┌────────────────────────────────────────────────────────┐
   │ 網路環境模擬： [ 有網路 (Online) ]   [ 離線保護模式 ]   │
   ├────────────────────────────────────────────────────────┤
   │                                                        │
   │           📱 去趣 chicTrip Mobile Prototype            │
   │                                                        │
   │    [01 測驗] ➔ [02 旅人畫像] ➔ [03 行程] ➔ [04 eSIM]    │
   │                        ⬇                               │
   │    [08 決策] ⬅ [07 分享卡] ⬅ [06 旅伴] ⬅ [05 守護包]    │
   │                                                        │
   ├────────────────────────────────────────────────────────┤
   │ ◀ 上一步  [01 測驗] [02 旅人] [03 行程] ...  下一步 ▶   │
   └────────────────────────────────────────────────────────┘
```

- **Step 1｜Campaign 互動測驗**（[`/`](http://localhost:5173/)）：點選目的地首爾、旅遊期待（可複選「弘大＆聖水洞漫步」等）與上網習慣，展示以趣味互動蒐集 First-party Intent。
- **Step 2｜AI 旅人畫像**（[`/result`](http://localhost:5173/result)）：產出「城市探險型旅人」專屬稱號、標籤，提供社群分享按鈕，建立情感認同。
- **Step 3｜行程洞察與痛點**（[`/trip`](http://localhost:5173/trip)）：載入首爾 5 日行程（標註「已儲存行程」），標示「抵達仁川機場尚未連線」之痛點。
- **Step 4｜精準 eSIM 導購**（[`/esim`](http://localhost:5173/esim)）：情境化推薦「韓國 5 日・每日 2GB 高速型」，解釋推薦原因並標註贈送離線守護包。
- **Step 5｜解鎖與下載守護包**（[`/pack`](http://localhost:5173/pack)）：檢視 680 KB 守護包規格，點擊下載至本機（重新快取），系統自動切換至「離線保護模式」。
- **Step 6｜離線 AI 旅伴問答**（[`/companion`](http://localhost:5173/companion)）：
  - 離線點擊「✈️ 機場到弘大交通」，驗證本機毫秒級回答。
  - 離線點擊「🌤️ 現在首爾幾度？」，驗證系統不連網、排入待連線清單防幻覺。
  - 切換為「有網路（Online）」，點擊「取得最新即時資訊」，驗證恢復連線更新。
- **Step 7｜旅後社群分享卡**（[`/share`](http://localhost:5173/share)）：展示個人回憶卡與 3 款 9:16 Travel DNA 限動卡，支援 1080×1920 PNG 下載與系統分享。
- **Step 8｜決策儀表板**（[`/evidence`](http://localhost:5173/evidence)）：檢視本次操作事件漏斗、Klook 差異化分析及架構評分。

---

## 9. 核心驗證問題集 (Test Query Matrix)

於 `/companion` 頁面測試之問題矩陣：

| 分類 | 測試查詢問題 | 離線模式 (Offline) 表現 | 有網路模式 (Online) 表現 | 資料來源模組 |
|---|---|---|---|---|
| **離線常備 1** | 我要怎麼從仁川機場到弘大的住宿？ | ✅ 回答 AREX 普通列車直達、弘大 3 號出口步行 3 分鐘 | ✅ 回答本機資料，顯示來源 | 交通指引 (`transport`) |
| **離線常備 2** | 我的住宿地址是什麼？ | ✅ 回答「弘大舒適文旅」、首爾市麻浦區楊花路 160 號 | ✅ 回答住宿門牌手冊 | 住宿手冊 (`places`) |
| **離線常備 3** | 明天行程有哪些景點？ | ✅ 回答 Day 2 景福宮衛兵換崗、北村韓屋村、益善洞 | ✅ 回答每日行程清單 | 每日行程 (`itinerary`) |
| **離線常備 4** | 景福宮有什麼歷史？ | ✅ 回答 1395 年太祖建宮、光化門守門將換崗 | ✅ 回答文化歷史手冊 | 文化導覽 (`places`) |
| **離線常備 5** | 去聖水洞要在哪一站下車？ | ✅ 回答地鐵 2 號線「聖水站」3 號/4 號出口 | ✅ 回答地鐵指南 | 交通指引 (`transport`) |
| **離線常備 6** | eSIM 沒有連上要先檢查什麼？ | ✅ 回答檢查數據漫遊、主要線路、APN、重新開機 4 步 | ✅ 回答官方排錯 SOP | eSIM 排錯 (`esim_help`) |
| **離線常備 7** | 韓國緊急電話是多少？ | ✅ 回答報警 112、救護 119、觀光中文翻譯 1330 | ✅ 回答緊急應變手冊 | 緊急應變 (`emergency`) |
| **離線常備 8** | 「請問洗手間在哪裡」韓文怎麼說？ | ✅ 回答【화장실이 어디예요?】附羅馬拼音與諧音 | ✅ 回答實用韓語語庫 | 實用短句 (`phrases`) |
| **時效性安全攔截** | AREX 現在有沒有延誤？ | ⚠️ **安全攔截排入佇列**，絕不用過期資料誤導 | ⚡ 回答模擬即時通報 (準點率 100%) | 線上即時 Adapter |
| **時效性安全攔截** | 現在首爾幾度？ | ⚠️ **安全攔截排入佇列**，提示連線後查詢 | ⚡ 回答模擬氣象觀測 (18°C 多雲) | 線上即時 Adapter |
| **誠實退避** | 幫我買 BTS 演唱會門票 | 🛑 提示超出守護包與即時資訊服務範圍 | 🛑 提示超出服務範圍 | 安全退避機制 |

---

## 10. 競品定位與差異化：Klook vs. 去趣 chicTrip

本原型在初賽策略上明確界定競爭邊界，以客觀公開功能特徵進行比較，不打價格流血戰，專注以個人化導購與離線守護創造差異化：

### 1. Klook 已建立的優勢（去趣避開正面交鋒）
- **海量 Marketplace 規模**：數十萬旅遊商品、累積百萬級成交評價與社會證明。
- **eSIM 供應鏈成熟度**：即買即發 QR Code、覆蓋數百國與多電信商庫存規模。
- **品類交叉銷售**：機票、飯店、一日遊與交通票券一站式加購。
- 🛑 **去趣避開之面向**：不比拼 SKU 總數、不打價格流血戰、不比評價總數。

### 2. 去趣 chicTrip 的核心差異化 (Winning Thesis)
- **① Travel DNA 意圖推薦**：Klook 由規格列表讓使用者自己猜流量；去趣透過 30 秒旅行測驗理解旅客情境，推薦最合適方案。
- **② 決策解釋性**：清楚說明「為什麼適合你」（例如：因排定弘大與聖水洞街拍，推薦每日 2GB），化解選購焦慮。
- **③ Offline AI Companion (Killer Benefit)**：Klook 賣完即結束；去趣購買即贈【離線旅程守護包】，抵達仁川機場無網時仍能秒查 AREX、住宿門牌與排錯。
- **④ 可信回答與時效閘道**：所有離線回答皆附來源手冊與更新時間；即時性問題（天氣、延誤）離線嚴格安全攔截，絕不拿舊資料亂答。
- **⑤ 旅後社群卡與 Referral 閉環**：旅後自動生成專屬 Travel Card 與推薦碼，好友點擊後重回測驗，形成低獲客成本之自驅增長飛輪。

---

## 11. 系統目錄架構 (Clean Architecture)

```text
HOTAI_AI_Hackathon_2026/
├── public/
│   ├── images/travel-dna/            # 3 款 9:16 Travel DNA 預製背景圖與文件
│   │   ├── urban-seoul.webp
│   │   ├── food-osaka.webp
│   │   ├── nature-hokkaido.webp
│   │   └── ASSETS_INFO.md            # 背景素材提示詞、生成工具與備援文件
│   └── sw.js                         # 離線 Service Worker (Cache-first & SPA Fallback)
├── src/
│   ├── app/
│   │   ├── router.tsx                # 8 個核心頁面 Route 配置
│   │   └── store.ts                  # Zustand 狀態管理 (Online/Offline、Vibes、Pack、Pending)
│   ├── components/
│   │   ├── OfflineStatusBar.tsx      # 頂部線上／離線保護模式切換列
│   │   ├── ChicBottomNav.tsx         # 底部步驟導覽列
│   │   ├── TravelDnaStoryCards.tsx   # 3 款 9:16 限動分享卡切換與輸出元件
│   │   ├── SourceCard.tsx            # 資料來源引用卡與信心度標籤
│   │   ├── FreshnessBadge.tsx        # 時效性狀態標籤 (本機檢索 / 即時最新 / 排入佇列)
│   │   └── MobileFrame.tsx           # 手機外框展示容器
│   ├── domain/
│   │   ├── trip.ts                   # 行程、旅客、eSIM 方案介面定義
│   │   ├── pack.ts                   # 旅程守護包 Manifest、KnowledgeItem 介面
│   │   ├── query.ts                  # ConnectionState ('online'|'offline')、QueryResult 介面
│   │   └── events.ts                 # 漏斗事件型別定義
│   ├── data/
│   │   ├── travelVibes.ts            # 期待旅遊方案複選資料、資料遷移與畫像計算
│   │   ├── companionQuestions.ts     # 旅伴問答卡片集中註冊 (8 離線 + 2 即時)
│   │   ├── travelDnaCards.ts         # 3 款 Travel DNA 範例卡資料
│   │   ├── trip.json                 # 首爾五日示範行程 (標記 mock: true)
│   │   ├── esim_plans.json           # 3 款 eSIM 方案 (標記 mock: true)
│   │   ├── pack_manifest.json        # 守護包規格清單 (680 KB, mock: true)
│   │   └── knowledge_items.json      # 8 類精選本機知識項目
│   ├── services/
│   │   ├── localPackStore.ts         # 守護包 localStorage 持久化儲存與讀取
│   │   ├── localRetrieval.ts         # 本機 BM25-like 權重計分檢索演算法
│   │   ├── queryClassifier.ts        # 關鍵字模式分類器 (即時 / 個人 / 靜態 / 超出範圍)
│   │   ├── queryRouter.ts            # 離線安全閘道與路由調度器 (離線嚴格阻斷外網)
│   │   ├── onlineAdapter.ts          # 模擬線上最新動態 (模擬 300ms 延遲，mock: true)
│   │   ├── imageGenerationAdapter.ts # 圖片生成服務 Adapter (預留介面，優先本機素材)
│   │   ├── offlineAssetCache.ts      # CacheStorage 圖片預載與 Service Worker 註冊服務
│   │   ├── travelCardCanvas.ts       # 1080 × 1920 PNG Canvas 繪製與匯出
│   │   └── analytics.ts              # 本機事件追蹤與漏斗指標統計
│   ├── pages/                        # 8 大漏斗頁面
│   └── tests/                        # Vitest 自動化測試套件
├── package.json
└── vite.config.ts
```
