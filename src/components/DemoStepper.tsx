import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '../app/store';
import { DEMO_STEPS } from '../constants/demoSteps';

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
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar flex-1 justify-end sm:justify-start">
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
              </button>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
