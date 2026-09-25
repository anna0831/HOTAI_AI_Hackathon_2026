import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CheckCircle2, Database, HardDrive, Calendar } from 'lucide-react';
import { ChicHeader } from '../components/ChicHeader';
import { PrimaryCTA } from '../components/PrimaryCTA';
import { SectionHeading } from '../components/SectionHeading';
import { useAppStore } from '../app/store';
import packManifest from '../data/pack_manifest.json';

export const PackBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { packState, downloadPack, resetPack, setConnectionState } = useAppStore();

  const handleDownload = async () => {
    await downloadPack();
  };

  const handleEnterCompanion = () => {
    // Automatically switch to offline mode to showcase the killer moment!
    setConnectionState('offline');
    navigate('/companion');
  };

  const sectionsList = [
    { id: 'itinerary', label: '首爾 5 日完整每日行程', desc: '景點時間、順序、備用方案' },
    { id: 'transport', label: 'AREX 機場快線與地鐵指南', desc: '弘大 3 號出口、聖水站換乘指示' },
    { id: 'places', label: '住宿門牌與景福宮文化導覽', desc: '弘大舒適文旅地址、宮闕歷史' },
    { id: 'esim_help', label: 'eSIM 啟用排錯作業標準', desc: '數據漫遊、APN、無網自救指南' },
    { id: 'emergency', label: '海外緊急應變與求助電話', desc: '韓國 112、119、1330 觀光中文' },
    { id: 'phrases', label: '生存常用韓文短句庫', desc: '洗手間位置、發音對照' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F4F7FB]">
      <ChicHeader subtitle="購買後專屬解鎖・離線旅程守護包" />

      <div className="p-4 space-y-4">
        {/* Banner with unlocked tone */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm">
          <SectionHeading
            badge="去趣購買後專屬加值服務"
            badgeColor="yellow"
            title="已為您解鎖【首爾 5 日離線旅程守護包】"
            subtitle={`專屬量身打造・體積僅 ${packManifest.size_kb} KB・一鍵快取至手機本機`}
          />

          {/* Metadata pill boxes */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3">
            <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200/80">
              <div className="text-[10px] text-[#64748B] font-bold mb-0.5 flex items-center justify-center gap-1">
                <HardDrive className="w-3 h-3 text-[#00AEEF]" />
                <span>檔案大小</span>
              </div>
              <div className="font-black text-[#171B28] font-mono text-sm">
                {packManifest.size_kb} KB
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200/80">
              <div className="text-[10px] text-[#64748B] font-bold mb-0.5 flex items-center justify-center gap-1">
                <Database className="w-3 h-3 text-[#FF8614]" />
                <span>知識段落</span>
              </div>
              <div className="font-black text-[#171B28] font-mono text-sm">
                {packManifest.total_passages} 筆
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200/80">
              <div className="text-[10px] text-[#64748B] font-bold mb-0.5 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3 text-[#18B46B]" />
                <span>有效期限</span>
              </div>
              <div className="font-black text-[#171B28] font-mono text-sm">
                2026/10/31
              </div>
            </div>
          </div>
        </div>

        {/* Download Action Box */}
        <div className="rounded-3xl bg-white p-5 border-2 border-[#00AEEF]/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  packState.isDownloaded
                    ? 'bg-[#E6F9F0] text-[#18B46B]'
                    : 'bg-[#E0F4FC] text-[#00AEEF]'
                }`}
              >
                {packState.isDownloaded ? (
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                ) : (
                  <Download className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>
              <div>
                <div className="font-black text-sm text-[#171B28]">
                  {packState.isDownloaded
                    ? '守護包已下載至手機本機'
                    : '準備下載專屬守護包'}
                </div>
                <div className="text-xs text-[#64748B] font-medium">
                  {packState.isDownloaded
                    ? '本機快取就緒・離線斷網零受阻'
                    : '寫入瀏覽器 Storage，斷網隨時查'}
                </div>
              </div>
            </div>

            {packState.isDownloaded && (
              <button
                type="button"
                onClick={resetPack}
                className="text-xs text-[#64748B] hover:text-[#171B28] underline font-bold cursor-pointer"
              >
                重新下載
              </button>
            )}
          </div>

          {/* Progress bar */}
          {packState.downloadProgress > 0 && packState.downloadProgress < 100 && (
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
              <div
                className="bg-[#00AEEF] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${packState.downloadProgress}%` }}
              />
            </div>
          )}

          {!packState.isDownloaded ? (
            <PrimaryCTA
              label="立即下載守護包至本機 (680 KB)"
              onClick={handleDownload}
              variant="blue"
              icon={<Download className="w-4 h-4" />}
            />
          ) : (
            <div className="text-xs font-bold text-[#18B46B] bg-[#E6F9F0] border border-[#18B46B]/30 rounded-2xl p-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span>本機已持久化儲存・離線模式隨時可用</span>
              </span>
              <span className="text-xs font-mono font-black">READY</span>
            </div>
          )}
        </div>

        {/* Included Modules Checklist */}
        <div className="rounded-3xl bg-white p-4 border border-slate-200/90 shadow-sm space-y-2">
          <h3 className="text-xs font-black text-[#171B28] mb-2 px-1">
            守護包收錄之 6 大離線常備模組
          </h3>
          {sectionsList.map((sec) => (
            <div
              key={sec.id}
              className="p-3 rounded-2xl bg-[#F4F7FB] border border-slate-200/80 flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-extrabold text-[#171B28] text-xs">
                  {sec.label}
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  {sec.desc}
                </div>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-[#00AEEF] border border-[#00AEEF]/20 font-mono shadow-2xs">
                收錄完備
              </span>
            </div>
          ))}
        </div>

        {/* Primary CTA to Companion */}
        <div className="pt-2 pb-4">
          <PrimaryCTA
            label="進入 AI 旅伴實測（模擬抵達仁川機場）"
            onClick={handleEnterCompanion}
            variant="orange"
          />
          <p className="text-[11px] text-[#64748B] text-center mt-2 font-medium">
            90 秒展示第 5 站：點擊後自動切換至「離線保護模式」驗證 Killer Moment
          </p>
        </div>
      </div>
    </div>
  );
};
