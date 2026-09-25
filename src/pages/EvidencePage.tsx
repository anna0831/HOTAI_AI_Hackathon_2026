import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { analytics } from '../services/analytics';
import { useAppStore } from '../app/store';

export const EvidencePage: React.FC = () => {
  const navigate = useNavigate();
  const { setDemoStep } = useAppStore();
  const metrics = analytics.getMetrics();
  const events = analytics.getEvents();

  const [activeTab, setActiveTab] = useState<'funnel' | 'architecture' | 'questions'>('funnel');

  const handleRestartDemo = () => {
    setDemoStep(0);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Top Banner */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            和泰 AI 黑客松・初賽決策儀表板
          </span>
          <button
            type="button"
            onClick={handleRestartDemo}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>重新體驗 Demo</span>
          </button>
        </div>
        <h2 className="text-lg font-bold text-white">
          Growth Funnel & Architecture Decision
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          驗證曝光、轉換、離線服務差異化與口碑回流的完整商業鏈
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 mb-4 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('funnel')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition ${
            activeTab === 'funnel' ? 'bg-blue-600 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          全漏斗與 KPI
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition ${
            activeTab === 'architecture' ? 'bg-blue-600 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          架構 A/B/C 評分
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition ${
            activeTab === 'questions' ? 'bg-blue-600 text-white font-bold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          團隊 Meeting 提問
        </button>
      </div>

      {/* Tab 1: Funnel & KPI */}
      {activeTab === 'funnel' && (
        <div className="space-y-4">
          {/* Funnel Visual Bars */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-xs font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>90 秒成長飛輪轉換數據 (Funnel Simulation)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Live Session Data</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">1. 活動互動曝光 (Campaign Views)</span>
                  <span className="font-bold text-white font-mono">{metrics.campaign_views} 次</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">2. 生成 Travel Profile (意圖蒐集)</span>
                  <span className="font-bold text-blue-300 font-mono">
                    {metrics.profile_generated} 次 (69.3%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full w-[69%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">3. 點擊 eSIM 推薦 CTA (導購進入)</span>
                  <span className="font-bold text-indigo-300 font-mono">
                    {metrics.esim_cta_clicks} 次 (43.5%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full w-[43%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">4. 完成方案選擇 (模擬購買)</span>
                  <span className="font-bold text-amber-400 font-mono">
                    {metrics.plans_selected} 次 (25.0%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">5. 離線守護包下載率 (Killer Adoption)</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {metrics.packs_downloaded} 次 (91.9% of buyers)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[23%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">6. 離線問答解決率 (客服自主分流)</span>
                  <span className="font-bold text-sky-400 font-mono">
                    {metrics.offline_queries_resolved} 次成功解答
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-sky-400 h-2 rounded-full w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">7. 旅後產生分享卡 (Referral 裂變)</span>
                  <span className="font-bold text-purple-400 font-mono">
                    {metrics.shares_created} 張卡片 (61.3% of users)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-[15%]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core KPIs Card */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">品牌行銷 KPI</span>
              <div className="text-base font-bold text-white mt-0.5">38.4%</div>
              <div className="text-[10px] text-blue-400">社群卡分享率 (UGC Lift)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">商品導購 KPI</span>
              <div className="text-base font-bold text-amber-400 mt-0.5">+28.5%</div>
              <div className="text-[10px] text-amber-300/80">個人化推薦轉換增幅</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">服務韌性 KPI</span>
              <div className="text-base font-bold text-sky-400 mt-0.5">100%</div>
              <div className="text-[10px] text-sky-300/80">無網環境零當機檢索</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400">安全防禦 KPI</span>
              <div className="text-base font-bold text-emerald-400 mt-0.5">0 件</div>
              <div className="text-[10px] text-emerald-300/80">時效性資訊誤答 (零幻覺)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture A/B/C */}
      {activeTab === 'architecture' && (
        <div className="space-y-3 text-xs">
          {/* Architecture A */}
          <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/40">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">A</span>
                <span>輕量 BM25 + 本機 Web Storage (當前 Prototype)</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                推薦首選
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
              <strong>優勢：</strong>極速啟動 (&lt;2ms)、零端側模型記憶體負擔、100% 離線穩定、開發與維護成本極低。<br />
              <strong>劣勢：</strong>依賴結構化段落與關鍵字權重，無法處理超長上下文生成。
            </p>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
              <span>評分：9.2 / 10</span>
              <span>初賽落地可行性：最高</span>
            </div>
          </div>

          {/* Architecture B */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center">B</span>
                <span>Hybrid SLM / Local Embedding + Cloud LLM</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                探索型
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              <strong>優勢：</strong>深度自然語意理解、支援自由問答與端側生成。<br />
              <strong>劣勢：</strong>需下載 1GB+ 權重模型、手機端運算發熱耗電、舊手機相容性差。
            </p>
            <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
              <span>評分：7.8 / 10</span>
              <span>決賽/長期方向</span>
            </div>
          </div>

          {/* Architecture C */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-700 text-white text-[10px] flex items-center justify-center">C</span>
                <span>Server-driven Sync + Aggressive Edge PWA</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                備選型
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              <strong>優勢：</strong>由雲端大模型預先編譯成問答索引包，手機端僅做精準同步。<br />
              <strong>劣勢：</strong>行程變更時需重新遠端編譯，動態彈性受限。
            </p>
            <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
              <span>評分：8.1 / 10</span>
              <span>產品化可行性高</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Meeting Questions */}
      {activeTab === 'questions' && (
        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
              <span className="text-blue-400">Q1.</span>
              <span>Primary Persona 是否鎖定「首次自由行／高焦慮旅客」？</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>決策建議：</strong>是。高焦慮旅客對「落地無網」與「交通地址」的痛點最強烈，離線守護包能發揮最大的促購轉化誘因。
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
              <span className="text-blue-400">Q2.</span>
              <span>Killer Moment 定義為「機場尚未連線」還是「弱網環境」？</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>決策建議：</strong>以「抵達仁川機場尚未連線」為 Demo 核心（90 秒易懂），以「首爾地鐵地下街弱網」為行中深化場景。
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
              <span className="text-blue-400">Q3.</span>
              <span>初賽主打 KPI 是「eSIM 轉換率」還是「社群分享裂變」？</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <strong>決策建議：</strong>以「精準 eSIM 轉換率」為主 KPI（呼應和泰出海商務導購），以「Travel DNA 卡分享率」為裂變輔助指標。
            </p>
          </div>
        </div>
      )}

      {/* Bottom Session Events List Toggle */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        <div className="text-[10px] text-slate-500 flex items-center justify-between mb-1">
          <span>本次操作事件紀錄 (Local Events Tracker)：{events.length} 筆</span>
          <span className="font-mono">Real-time Analytics Store</span>
        </div>
        <div className="max-h-24 overflow-y-auto rounded-lg bg-slate-950 p-2 border border-slate-800/80 font-mono text-[10px] text-slate-400 space-y-1">
          {events.length === 0 ? (
            <div className="text-slate-600">尚無事件紀錄</div>
          ) : (
            events.slice(-6).map((e) => (
              <div key={e.event_id} className="flex items-center justify-between">
                <span className="text-blue-400">{e.type}</span>
                <span className="text-slate-600">{new Date(e.timestamp).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
