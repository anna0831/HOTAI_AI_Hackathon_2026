# 去趣 eSIM × Offline AI Travel Companion (Growth Funnel Decision Prototype)

> **2026 和泰 AI 黑客松** 初賽提案原型  
> **核心論點**：去趣將「你的旅行型態」轉成最適 eSIM 與專屬旅程服務：行前以 GenAI 互動精準導購，購買後解鎖個人化 Offline Travel Pack (Killer Benefit)，旅途中持續守護，旅後再生成可分享內容，形成 **曝光 → 轉換 → 服務 → 口碑** 的成長飛輪。

---

## 🚀 快速啟動

```bash
# 1. 安裝套件
npm install

# 2. 啟動本機開發伺服器
npm run dev

# 3. 執行單元與整合測試 (15+ 檢索與時效性測試)
npm run test

# 4. 執行 TypeScript 型別檢查與正式打包
npm run typecheck
npm run build
```

---

## 🎯 90 秒完整展示路徑 (90s Demo Script)

| 時間 | 頁面與路由 | 操作展示 | 核心商業與技術論證 |
|---|---|---|---|
| **0–10 秒** | `/` Campaign Landing | 完成「旅行型態測驗」／載入首爾 5 日示範行程 | GenAI 互動創造話題並低成本取得 First-party Intent |
| **10–23 秒** | `/result` Travel Profile | 產出「城市探險型旅人」個人化 DNA 與分享卡 | 建立品牌好感度、社群分享卡與精準導購轉化入口 |
| **23–35 秒** | `/esim` Smart eSIM | 顯示推薦理由（穿梭弘大地圖與高畫質上傳）與方案 | 解決流量規格認知門檻，推薦每日 2GB 方案 |
| **35–45 秒** | `/pack` Pack Builder | 選擇方案並解鎖【首爾 5 日離線旅程守護包】 | 離線服務作為促購 Killer Benefit（無網環境仍安心） |
| **45–62 秒** | `/companion` AI Companion | 模擬抵達仁川機場，切換 **Offline 模式**，詢問住宿交通 | 驗證 **本機離線檢索真實可用**，回答 AREX 與弘大門牌 |
| **62–72 秒** | `/companion` AI Companion | 詢問即時問題「AREX 現在有沒有延誤？」 | 驗證 **時效性安全閘道**：離線絕不拿舊資料亂答，排入待連線 |
| **72–82 秒** | `/companion` AI Companion | 切回 **Online 模式**，一鍵取得最新即時資訊 | Hybrid 路由動態調度與服務深化 |
| **82–90 秒** | `/share` & `/evidence` | 產出帶推薦碼之 AI Travel Card，檢視決策數據 | 形成 Referral 閉環，儀表板量測全漏斗轉換率與架構 A/B/C |

---

## 🧩 系統分層架構

```text
src/
├── app/          # 全域 Layout、8 核心 Route、Zustand 全域狀態
├── components/   # 連線模擬膠囊、90s 導航步進器、來源引用卡、時效狀態徽章
├── domain/       # Trip, Pack, Query, Events 嚴格型別定義
├── data/         # 首爾 5 日行程、eSIM 方案、Manifest、知識庫 (標記 mock: true)
├── services/     # 本機持久化、BM25-like 檢索、時效分類器、安全路由、事件追蹤
└── pages/        # 8 大成長漏斗全流程頁面
```

---

## 🛡️ 安全離線原則 (No-Hallucination Guardrails)

1. **嚴格離線攔截**：在 `Offline` 模式下絕不發起任何 external fetch 或網路請求。
2. **時效性分類保護**：偵測到「現在、今天、延誤、天氣、匯率、排隊」等即時字眼，離線下一律排入佇列，拒絕用離線舊資料誤導旅客。
3. **誠實退避 (Honest Fallback)**：超出守護包範疇（如搶票、代辦），誠實告知範圍限制，杜絕大模型胡言亂語。
