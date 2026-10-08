import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../app/store';
import { DEMO_STEPS } from '../constants/demoSteps';

export const ChicBottomNav: React.FC = () => {
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
    <footer className="bg-white/95 border-t border-slate-200/90 px-3 py-2 text-xs backdrop-blur-md sticky bottom-0 z-40 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="p-2 rounded-none bg-[#F4F7FB] text-[#143D5C] hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer border border-slate-200"
            title="上一步"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeStep === DEMO_STEPS.length - 1}
            className="px-3 py-2 rounded-none bg-[#00AEEF] hover:bg-[#009bd6] text-white font-bold transition flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-30 disabled:pointer-events-none"
            title="下一步"
          >
            <span>下一步</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar flex-1 justify-end sm:justify-start">
          {DEMO_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={step.path}
                type="button"
                onClick={() => handleStepClick(idx)}
                className={`px-3 py-1.5 rounded-none whitespace-nowrap text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#171B28] text-white font-bold shadow-sm'
                    : 'bg-[#F4F7FB] text-[#64748B] hover:text-[#171B28] hover:bg-slate-200/80 border border-slate-200/60 font-medium'
                }`}
              >
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
