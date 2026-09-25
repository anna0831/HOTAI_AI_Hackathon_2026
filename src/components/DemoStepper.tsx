import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useAppStore } from '../app/store';

export const DEMO_STEPS = [
  { path: '/', label: '01 測驗入口', time: '0-10s', title: 'GenAI 互動創造話題' },
  { path: '/result', label: '02 旅人畫像', time: '10-23s', title: '個人化 DNA 與社群卡' },
  { path: '/trip', label: '03 行程洞察', time: '23s', title: '首爾五日需求分析' },
  { path: '/esim', label: '04 eSIM 導購', time: '23-35s', title: '情境推薦與促購理由' },
  { path: '/pack', label: '05 守護包下載', time: '35-45s', title: '購買後解鎖 Killer Benefit' },
  { path: '/companion', label: '06 離線 AI 旅伴', time: '45-82s', title: '離線可用・時效閘道' },
  { path: '/share', label: '07 旅後分享', time: '82-90s', title: '社群裂變 Referral Loop' },
  { path: '/evidence', label: '08 決策儀表板', time: '90s', title: 'Funnel 數據與架構評分' },
];

export const DemoStepper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoStep, setDemoStep } = useAppStore();

  const currentIndex = DEMO_STEPS.findIndex((s) => s.path === location.pathname);
  const activeStep = currentIndex >= 0 ? currentIndex : demoStep;

  const handleStepClick = (index: number) => {
    setDemoStep(index);
    navigate(DEMO_STEPS[index].path);
  };

  const handleNext = () => {
    if (activeStep < DEMO_STEPS.length - 1) {
      handleStepClick(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      handleStepClick(activeStep - 1);
    }
  };

  return (
    <footer className="bg-slate-950/95 border-t border-slate-800 px-3 py-2 text-xs backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
            title="上一步"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeStep === DEMO_STEPS.length - 1}
            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1 px-2 font-medium"
            title="下一步"
          >
            <span>下一步</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper pills scrollable */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar">
          {DEMO_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.path}
                type="button"
                onClick={() => handleStepClick(idx)}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{step.label}</span>
                <span className="text-[10px] opacity-70">({step.time})</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0 font-medium">
          <Play className="w-3 h-3 text-blue-400" />
          <span>90s Demo Mode</span>
        </div>
      </div>
    </footer>
  );
};
