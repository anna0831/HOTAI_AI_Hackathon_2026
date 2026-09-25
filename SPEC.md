# 和泰 AI 黑客松｜Vibe Coding Prototype SPEC

> 專案：去趣 eSIM × Offline AI Travel Companion  
> 文件目的：在下一次團隊 Meeting 前完成一個可操作的小作品，用來驗證 GenAI 行銷轉換、離線服務差異化與口碑回流，並形成初賽 Demo 雛形  
> 版本：v0.2｜2026-09-25（依官方題目截圖修正）

## 1. Prototype 定位

這不是完整去趣 App，也不是最終技術架構。它是一個 **Growth Funnel Decision Prototype**：用最小可行的互動流程，驗證「GenAI 個人化互動 → 精準 eSIM 導購 → Offline-first 服務 → 旅後分享」能否形成完整的行銷與服務循環。

> 官方題目主體是 **GenAI 應用行銷方案**。Offline AI Travel Companion 應作為購買後的 Killer Benefit 與服務差異化，不能單獨取代曝光、導購與轉換設計。

### 本次必須回答的三個問題

1. 個人化旅遊互動是否能自然蒐集需求，並把流量導向適合的 eSIM 方案？
2. Offline Travel Companion 是否足以成為選擇去趣 eSIM 的差異化購買理由？
3. 購買後服務與旅後分享能否形成口碑、UGC 與下一輪品牌曝光？

### Winning Thesis

> 去趣將「你的旅行型態」轉成最適 eSIM 與專屬旅程服務：行前以 GenAI 互動精準導購，購買後生成個人化 Offline Travel Pack，旅途中持續服務，旅後再生成可分享內容，形成曝光 → 轉換 → 服務 → 口碑的成長飛輪。

### 成功標準

- 新使用者在 90 秒內理解從互動行銷到購買後服務的完整價值。
- Demo 中必須存在可量測的 CTA：查看方案、選擇方案或模擬購買。
- Demo 可在關閉網路後完成至少 3 種本機查詢。
- 即時問題不會被離線舊資料誤答。
- 每個畫面都能連回品牌曝光、eSIM Conversion、服務深化或分享 KPI。
- Meeting 結束時能做出 Architecture A／B／C 的下一步決策。

## 2. Scope

### Must Have

1. 可分享的 GenAI「旅行型態測驗／Trip Scanner」入口。
2. 首爾五日行程摘要與旅客潛在需求分析。
3. 依行程推薦 eSIM 方案、專屬促銷訊息與推薦理由。
4. 明確的方案選擇／模擬購買 CTA。
5. 購買後建立／下載 Seoul Travel Pack。
6. Online／Poor Connection／Offline 模式切換。
7. 本機資料檢索、離線回答與即時問題安全 Routing。
8. 旅後生成一張可分享的 AI Travel Card，帶有去趣 eSIM CTA。

### Should Have

- Pack 內容預覽與大小。
- eSIM 啟用排錯資訊。
- 查詢紀錄與事件追蹤面板。
- 60～90 秒 Demo Mode，自動引導展示順序。

### Could Have

- Gemini API 線上回答。
- PWA 安裝與 Service Worker 快取。
- Pack 更新與版本差異畫面。

### Won't Have in v0.1

- 真實付款。
- 真實 eSIM 開通或電信串接。
- 完整地圖導航。
- 真實去趣會員登入。
- 大量目的地資料。
- 手機端大型 LLM。
- 未經驗證的推薦模型或精準流量預測。

## 3. Primary Persona 與 Demo 情境

### Persona

**Anna，第一次獨自前往首爾自由行五天。**她已在去趣建立行程，但擔心抵達仁川機場後 eSIM 尚未成功啟用，無法查住宿地址、交通方式與基本韓文。

### Seoul Sample Trip

| Day | 區域／景點 | Offline Pack 重點 |
|---|---|---|
| Day 1 | 仁川機場 → 弘大住宿 | 機場交通、住宿地址、eSIM 啟用指南 |
| Day 2 | 景福宮、北村、益善洞 | 景點介紹、基本交通、韓文短句 |
| Day 3 | 聖水洞、首爾林 | 行程順序、地鐵出口、備用景點 |
| Day 4 | 明洞、南山首爾塔 | 購物資訊、退稅提示、交通指南 |
| Day 5 | 弘大 → 仁川機場 | 回程交通、航廈提醒、緊急資訊 |

### Killer Moment

> 抵達仁川機場後，畫面顯示 Offline。使用者問：「我現在要怎麼去弘大的住宿？」系統從已下載的個人行程與交通資料中回答；接著問「現在機場快線有沒有延誤？」系統判斷為即時資訊，不用離線資料亂答，而是加入待連線查詢。恢復 Online 後自動取得最新資訊。

## 4. 90 秒 Demo Script

| 時間 | 操作 | 畫面應傳達的重點 |
|---:|---|---|
| 0–10 秒 | 完成旅行型態測驗／匯入首爾行程 | GenAI 互動創造話題並取得 First-party Intent |
| 10–23 秒 | 生成「城市探險型旅人」結果與分享卡 | 品牌曝光、社群分享與導流入口 |
| 23–35 秒 | 顯示個人化 eSIM 推薦與促購理由 | 從需求洞察進入精準導購 |
| 35–45 秒 | 選擇方案並解鎖 Seoul Travel Pack | 購買後服務成為轉換誘因 |
| 45–62 秒 | 切換 Offline，詢問住宿交通 | 本機 Pack 真實可用 |
| 62–72 秒 | 詢問即時天氣或延誤 | 系統辨識資料新鮮度，不誤導 |
| 72–82 秒 | 恢復 Online 並取得最新資訊 | Hybrid Routing 與服務深化 |
| 82–90 秒 | 旅後分享卡＋Growth KPI 面板 | 分享回流與完整成長飛輪 |

## 5. Information Architecture

### Route／Screen

| Route | Screen | 目的 |
|---|---|---|
| `/` | Campaign Landing／Travel DNA | 話題式互動入口，蒐集旅遊意圖並鼓勵分享 |
| `/result` | AI Travel Profile | 顯示旅行型態、需求洞察與個人化內容 |
| `/trip` | Trip Overview | 展示首爾行程與 AI 分析出的旅客需求 |
| `/esim` | Smart eSIM Recommendation | 推薦方案、理由、假設流量需求 |
| `/pack` | Travel Pack Builder | 顯示 Pack 內容、大小、版本、下載狀態 |
| `/companion` | AI Travel Companion | Offline／Online 問答與狀態切換 |
| `/share` | AI Travel Card | 生成可分享內容與推薦碼／CTA |
| `/evidence` | Decision Dashboard | 顯示事件、KPI 假設、Architecture 比較與回饋 |

## 6. Query Routing Spec

```text
使用者輸入 Query
    ↓
Query Classifier
    ├─ personal/stable → Local Retrieval
    │                      ↓
    │                 找到資料？
    │                 ├─ Yes → Local Answer + Source
    │                 └─ No  → Honest Fallback
    │
    ├─ real_time + Online → Online Adapter
    ├─ real_time + Offline → Queue + Freshness Warning
    └─ unknown → Conservative Fallback / Ask Clarifying Question
```

### 回答狀態

| Status | UI Label | 說明 |
|---|---|---|
| `offline_local` | 已使用離線旅程包 | 使用本機資料，顯示資料時間 |
| `online_live` | 已取得最新資訊 | 使用 Online Adapter |
| `queued` | 等待連線 | 即時問題待重新查詢 |
| `not_found` | 旅程包中沒有資料 | 不猜測、不幻覺 |
| `stale` | 資料可能已過期 | 顯示風險並建議連線確認 |
