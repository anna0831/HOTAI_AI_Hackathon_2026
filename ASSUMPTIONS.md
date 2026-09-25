# ASSUMPTIONS｜去趣 eSIM × Offline AI Travel Companion

本文件記錄「去趣 eSIM × Offline AI Travel Companion (Growth Funnel Decision Prototype)」在初賽雛形階段所採取的商業與技術假設，待團隊 Meeting 與下一階段驗證。

---

## 1. 商業與行銷假設 (Business & Marketing Assumptions)

1. **First-party Intent 蒐集**：
   - *假設*：透過 3~5 題趣味旅行型態測驗或匯入現有行程，使用者願意提供目的地、天數、旅伴與數位使用習慣（如重度地圖、社群分享）。
   - *待驗證*：測驗完成率是否高於 65%？使用者是否覺得被問得自然而非填寫調查問卷？

2. **精準 eSIM 導購轉換 (Conversion Lift)**：
   - *假設*：個人化推薦理由（例如「因為您預計造訪 5 個熱門地圖打卡點，推薦每日 2GB」）的點擊轉化率顯著高於傳統純規格列表（總量/吃到飽）。
   - *待驗證*：推薦理由是否能消除「不知道該買哪種流量」的選擇障礙？

3. **離線服務作為 Killer Benefit (Value Proposition)**：
   - *假設*：尚未抵達或剛落地仁川機場時，網路常處於未開通或弱網狀態。提供「買去趣 eSIM 即贈離線旅程守護包」能成為促使消費者選擇去趣而非競品（如 KKday/Klook/電信漫遊）的關鍵差異化誘因。
   - *待驗證*：旅客對「落地離線安心包」的付費/購買激勵感知度是否強烈？

4. **旅後社群分享與 Referral 循環 (Virality & Growth Loop)**：
   - *假設*：旅後自動生成帶有旅客型態、去趣專屬旅程標籤與折扣推薦碼的 AI Travel Card，使用者樂於分享至 Instagram Stories 或 LINE 旅伴群組，帶進新流量。
   - *待驗證*：分享意願度、平均 Referral 裂變係數 $K$-factor 是否 $> 0.2$？

---

## 2. 技術與產品架構假設 (Technical & Architecture Assumptions)

1. **本機檢索與資料規模 (Local Retrieval vs Device Memory)**：
   - *假設*：單一 5 日行程旅程守護包（包含行程、住宿、地鐵交通、eSIM 啟用指南、緊急電話、實用韓文短句）結構化 JSON 大小約 500KB~1.5MB，可直接快取於瀏覽器 LocalStorage / IndexedDB / Service Worker，對行動裝置無儲存與效能負擔。
   - *待驗證*：若擴展至 10 日或多城市，文字檢索的延遲是否仍在 50ms 以內？

2. **Freshness Routing 與資料安全 (No Hallucination)**：
   - *假設*：透過關鍵字與模式比對（如「現在」、「延誤」、「天氣」、「營業中」）能有效攔截 95% 以上需要聯網的即時性查詢，避免使用離線靜態資料產生「時效性幻覺」。
   - *待驗證*：離線狀態下誠實拒答或排入佇列（Queued for reconnect）是否能提升使用者對去趣品牌的信任度？

3. **架構演進路徑 (Architecture A/B/C Trade-off)**：
   - **Architecture A (Lightweight BM25 + Web Storage)**：本 Prototype 採用的架構。零端側模型負擔，相容性極高，啟動速度最快。
   - **Architecture B (Hybrid SLM/Local Embedding + Cloud LLM)**：端側運行小型 Embedding 或 1B~3B SLM（如 WebLLM / MediaPipe Gemma）。適合深度語意理解，但需考慮手機發熱與 1GB+ 記憶體下載成本。
   - **Architecture C (Server-driven Sync + Aggressive Edge PWA)**：雲端預先生成問答索引包，手機端僅做快速查找與增量更新。

---

## 3. Mock 與真實界線聲明 (Boundary of Mock Data)

- **Mock 資料 (標記 `mock: true`)**：
  - 首爾五日示範行程 (`trip.json`)
  - 3 款去趣 eSIM 方案定價與促銷文案 (`esim_plans.json`)
  - 旅程守護包 manifest 與知識段落 (`pack_manifest.json`, `knowledge_items.json`)
  - 模擬線上即時天氣與列車資訊 (`onlineAdapter.ts`)
- **真實運作功能 (Real Logic)**：
  - 狀態機切換（Online / Poor Connection / Offline）
  - 本機檢索演算法（正規化、斷詞比對、BM25-like 權重計分、Top-K 抽取與答案組合）
  - 時效性路由分類器（Query Classifier & Router）
  - 本機儲存持久化（LocalStorage 讀寫與版本識別）
  - 全流程事件追蹤與 Funnel 指標計算器
