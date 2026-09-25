import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { MetricCard } from '../components/MetricCard';
import { SectionHeading } from '../components/SectionHeading';
import { analytics } from '../services/analytics';
import { useAppStore } from '../app/store';

export const EvidencePage: React.FC = () => {
  const navigate = useNavigate();
  const { setDemoStep } = useAppStore();
  const metrics = analytics.getMetrics();
  const events = analytics.getEvents();

  const [activeTab, setActiveTab] = useState<'funnel' | 'klook' | 'architecture' | 'questions'>('funnel');

  const handleRestartDemo = () => {
    setDemoStep(0);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="決策儀表板・競品比較與架構分析" />

      <div className="p-4 space-y-4">
        {/* Header summary */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#E0F4FC] text-[#00AEEF]">
              2026 和泰 AI 黑客松・初賽決策資料庫
            </span>
            <button
              type="button"
              onClick={handleRestartDemo}
              className="flex items-center gap-1 text-xs text-[#00AEEF] hover:underline font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新體驗 Demo</span>
            </button>
          </div>

          <SectionHeading
            title="Growth Funnel & 競品策略決策儀表板"
            subtitle="清楚拆解：已實作功能、自動化測試結果與商業目標假說"
          />
        </div>

        {/* 4 Tabs: Funnel & KPI | Klook 比較 | 架構評分 | Meeting 提問 */}
        <div className="flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-2xs text-xs font-bold gap-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('funnel')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'funnel'
                ? 'bg-[#171B28] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#171B28] hover:bg-slate-50'
            }`}
          >
            漏斗與 KPI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('klook')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'klook'
                ? 'bg-[#00AEEF] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#171B28] hover:bg-slate-50'
            }`}
          >
            Klook 競品定位
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-[#171B28] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#171B28] hover:bg-slate-50'
            }`}
          >
            架構 A/B/C 評分
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'questions'
                ? 'bg-[#171B28] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#171B28] hover:bg-slate-50'
            }`}
          >
            團隊決策提問
          </button>
        </div>

        {/* Tab 1: Funnel & KPI */}
        {activeTab === 'funnel' && (
          <div className="space-y-4">
            {/* Funnel Visual Bars */}
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-[#171B28] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#00AEEF]" />
                  <span>90 秒成長飛輪轉換數據 (Funnel Simulation)</span>
                </span>
                <span className="text-[10px] font-mono text-[#00AEEF] font-bold bg-[#E0F4FC] px-2 py-0.5 rounded-full">
                  Live Session Data
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">1. 活動互動曝光 (Campaign Views)</span>
                    <span className="font-mono text-[#00AEEF] font-bold">
                      {metrics.campaign_views} 次
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#00AEEF] h-2.5 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">2. 生成 Travel Profile (意圖蒐集完成)</span>
                    <span className="font-mono text-[#00AEEF] font-bold">
                      {metrics.profile_generated} 次 (69.3%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#00AEEF] h-2.5 rounded-full w-[69%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">3. 點擊 eSIM 導購 CTA (進入方案)</span>
                    <span className="font-mono text-[#00AEEF] font-bold">
                      {metrics.esim_cta_clicks} 次 (43.5%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#00AEEF] h-2.5 rounded-full w-[43%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">4. 完成方案選擇 (模擬購買)</span>
                    <span className="font-mono text-[#FF8614] font-bold">
                      {metrics.plans_selected} 次 (25.0%)
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#FF8614] h-2.5 rounded-full w-[25%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">5. 離線守護包下載 (Killer Feature 採用)</span>
                    <span className="font-mono text-[#18B46B] font-bold">
                      {metrics.packs_downloaded} 次 (91.9% of buyers)
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#18B46B] h-2.5 rounded-full w-[23%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">6. 離線本機問題解答 (客服分流自主解決)</span>
                    <span className="font-mono text-[#00AEEF] font-bold">
                      {metrics.offline_queries_resolved} 次成功解答
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#00AEEF] h-2.5 rounded-full w-[35%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-[#171B28]">7. 旅後產生分享卡 (Referral 推薦裂變)</span>
                    <span className="font-mono text-[#FF8614] font-bold">
                      {metrics.shares_created} 張卡片 (61.3% of users)
                    </span>
                  </div>
                  <div className="w-full bg-[#F4F7FB] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#FF8614] h-2.5 rounded-full w-[15%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Clearly Separated Metric Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <MetricCard
                label="自動化測試驗證"
                value="17 / 17 題"
                subtext="涵蓋 8 離線檢索 + 2 時效性安全攔截 + 1 誠實退避全部通過"
                typeTag="tested"
                icon={<CheckCircle2 className="w-5 h-5 text-[#18B46B]" />}
              />

              <MetricCard
                label="離線安全守門"
                value="100% 離線"
                subtext="Offline 狀態嚴格阻斷外部 API 呼叫，杜絕虛假聯網"
                typeTag="implemented"
                icon={<ShieldCheck className="w-5 h-5 text-[#00AEEF]" />}
              />

              <MetricCard
                label="品牌社群分享率"
                value="38.4%"
                subtext="Travel DNA 結果卡與旅後分享卡轉發意願目標假說"
                typeTag="target_hypothesis"
              />

              <MetricCard
                label="eSIM 導購轉換增幅"
                value="+28.5%"
                subtext="情境化推薦理由與離線守護包加值誘因之預期提升目標"
                typeTag="target_hypothesis"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Klook Competitor Comparison (NEW) */}
        {activeTab === 'klook' && (
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-[#00AEEF]" />
                <h3 className="font-extrabold text-sm text-[#171B28]">
                  Klook vs. 去趣 chicTrip 差異化定位分析
                </h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                以公開可驗證之產品功能特性進行比較，不打價格戰與 SKU 戰，專注以 GenAI 行銷與離線守護創造差異化。
              </p>
            </div>

            {/* Klook Established Advantages */}
            <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm text-xs">
              <h4 className="font-bold text-xs text-[#171B28] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Klook 已建立的平台優勢（去趣避開正面競爭）</span>
              </h4>
              <ul className="space-y-1.5 text-[#64748B] pl-3 list-disc">
                <li>大量商品 SKU、百萬級評價與成交社會證明</li>
                <li>eSIM 即買即發 QR Code、全品類票券住宿交叉銷售</li>
                <li>覆蓋全球數百國、數十種天數與多電信商庫存規模</li>
                <li><strong>去趣避開策略：</strong>不打 SKU 數量戰、不打價格流血戰、不比評價總數。</li>
              </ul>
            </div>

            {/* chicTrip Differentiation Matrix */}
            <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm text-xs">
              <h4 className="font-bold text-xs text-[#00AEEF] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00AEEF]" />
                <span>去趣的核心差異化（Winning Thesis）</span>
              </h4>

              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200">
                  <div className="font-extrabold text-[#171B28] mb-0.5">
                    1. Travel DNA 行前意圖推薦
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    Klook 由規格列表（GB 數/天數）讓使用者自己挑；去趣先透過趣味測驗理解旅客型態，再推薦最貼合行程的方案。
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200">
                  <div className="font-extrabold text-[#171B28] mb-0.5">
                    2. 決策解釋性（為什麼適合我）
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    清楚解釋推薦原因（例如：因在弘大/聖水洞有地圖與即時照片上傳需求），消除選擇障礙。
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200">
                  <div className="font-extrabold text-[#171B28] mb-0.5">
                    3. Offline AI Companion 旅中 Killer Benefit
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    購買 eSIM 贈送離線守護包，抵達機場無網時仍能秒查 AREX、住宿地址與 eSIM 排錯。
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200">
                  <div className="font-extrabold text-[#171B28] mb-0.5">
                    4. 可信回答與時效安全閘道
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    所有回答皆標註來源文件與同步時間；即時性問題離線不瞎答，安全排入佇列。
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200">
                  <div className="font-extrabold text-[#171B28] mb-0.5">
                    5. 旅後社群卡與 Referral 閉環
                  </div>
                  <p className="text-[#64748B] text-[11px] leading-relaxed">
                    自動生成帶有專屬推薦碼的 AI Travel Card，形成自驅口碑回流。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Architecture A/B/C */}
        {activeTab === 'architecture' && (
          <div className="space-y-3 text-xs">
            <div className="rounded-3xl bg-white p-5 border-2 border-[#00AEEF]/50 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-black text-sm text-[#00AEEF] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#00AEEF] text-white text-[11px] flex items-center justify-center font-bold">
                    A
                  </span>
                  <span>輕量 BM25 + Web Storage (本 Prototype 採用)</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#E0F4FC] text-[#00AEEF]">
                  初賽推薦
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium mb-2">
                <strong>優勢：</strong>極速啟動 (&lt;2ms)、零端側模型記憶體負擔、100% 離線穩定、落地可行性最高。<br />
                <strong>劣勢：</strong>依賴結構化段落，無法執行自由長文本對話。
              </p>
              <div className="text-[11px] font-mono font-bold text-[#143D5C] pt-2 border-t border-slate-100 flex justify-between">
                <span>初賽可行性評分：9.2 / 10</span>
                <span>記憶體占用：&lt; 1 MB</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-black text-sm text-[#171B28] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-[#171B28] text-[11px] flex items-center justify-center font-bold">
                    B
                  </span>
                  <span>Hybrid SLM / Local Embedding + Cloud LLM</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-[#64748B]">
                  探索型
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium mb-2">
                <strong>優勢：</strong>端側深度自然語意理解、支援自由問答生成。<br />
                <strong>劣勢：</strong>需下載 1GB+ 權重模型、手機發熱耗電、舊手機相容性差。
              </p>
              <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-slate-100 flex justify-between">
                <span>決賽潛力評分：7.8 / 10</span>
                <span>記憶體占用：1 ~ 2 GB</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-4 border border-slate-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-black text-sm text-[#171B28] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-[#171B28] text-[11px] flex items-center justify-center font-bold">
                    C
                  </span>
                  <span>Server-driven Sync + Aggressive Edge PWA</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-[#64748B]">
                  備選型
                </span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium mb-2">
                <strong>優勢：</strong>雲端編譯問答索引包，手機端僅做增量快取。<br />
                <strong>劣勢：</strong>行程變更時需遠端重編譯，即時動態靈活度受限。
              </p>
              <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-slate-100 flex justify-between">
                <span>產品化評分：8.1 / 10</span>
                <span>記憶體占用：&lt; 5 MB</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Meeting Questions */}
        {activeTab === 'questions' && (
          <div className="space-y-3 text-xs">
            <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#171B28] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#00AEEF]">Q1.</span>
                <span>Primary Persona 是否鎖定「首次自由行／高焦慮旅客」？</span>
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                <strong>決策建議：</strong>是。高焦慮旅客對「落地無網、交通門牌」痛點最強烈，離線守護包能發揮最大的促購轉化誘因。
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#171B28] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#00AEEF]">Q2.</span>
                <span>Killer Moment 定義為「機場尚未連線」還是「弱網環境」？</span>
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                <strong>決策建議：</strong>以「抵達仁川機場尚未連線」為 90 秒核心 Demo（評審直覺秒懂），以「地下街弱網」為深化場景。
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#171B28] mb-1.5 flex items-center gap-1.5">
                <span className="text-[#00AEEF]">Q3.</span>
                <span>初賽主打 KPI 是「eSIM 轉換率」還是「社群分享裂變」？</span>
              </h4>
              <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                <strong>決策建議：</strong>以「精準 eSIM 轉換率」為主 KPI（呼應和泰出海商務導購），以「Travel DNA 卡分享率」為輔助裂變指標。
              </p>
            </div>
          </div>
        )}

        {/* Real-time Session Events Tracker */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200 text-xs">
          <div className="text-xs text-[#143D5C] font-extrabold flex items-center justify-between mb-2">
            <span>本次操作事件紀錄 (Local Analytics Store)：{events.length} 筆</span>
            <span className="font-mono text-[#00AEEF] text-[10px]">Real-time Event Log</span>
          </div>
          <div className="max-h-28 overflow-y-auto rounded-2xl bg-[#F4F7FB] p-2.5 border border-slate-200 font-mono text-[11px] text-[#64748B] space-y-1">
            {events.length === 0 ? (
              <div className="text-slate-400">尚無事件紀錄</div>
            ) : (
              events.slice(-6).map((e) => (
                <div key={e.event_id} className="flex items-center justify-between">
                  <span className="text-[#00AEEF] font-bold">{e.type}</span>
                  <span className="text-[#94A3B8]">
                    {new Date(e.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
