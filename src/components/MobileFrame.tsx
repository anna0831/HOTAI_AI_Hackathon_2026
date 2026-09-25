import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex justify-center items-start bg-slate-950 p-0 sm:py-4 sm:px-2">
      <div className="w-full max-w-[430px] min-h-[820px] bg-slate-900 sm:rounded-[36px] sm:border-[6px] sm:border-slate-800 shadow-2xl overflow-hidden flex flex-col relative text-slate-100 sm:ring-1 sm:ring-slate-700/50">
        {/* Mobile Speaker / Camera Notch bar */}
        <div className="hidden sm:flex justify-center items-center pt-2 pb-1 bg-slate-900 z-20">
          <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
          </div>
        </div>

        {/* Content container */}
        <div className="flex-1 flex flex-col overflow-y-auto relative">
          {children}
        </div>

        {/* Mobile Home Indicator bar */}
        <div className="hidden sm:flex justify-center items-center py-2 bg-slate-900/90 backdrop-blur z-20">
          <div className="w-32 h-1 bg-slate-600/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
