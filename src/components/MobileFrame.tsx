import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <main className="w-full flex-1 flex justify-center items-start bg-[#F4F7FB] p-0 sm:py-6 sm:px-4">
      {/* Mobile container centered on desktop */}
      <div className="w-full max-w-[440px] min-h-[820px] bg-white sm:rounded-[36px] sm:border sm:border-slate-200/90 shadow-xl shadow-slate-300/40 overflow-hidden flex flex-col relative text-[#171B28]">
        {/* Subtle camera punch hole on desktop frame */}
        <div className="hidden sm:flex justify-center items-center pt-2.5 pb-1 bg-white z-20 shrink-0">
          <div className="w-20 h-3.5 bg-slate-100 rounded-full flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Content container */}
        <div className="flex-1 flex flex-col overflow-y-auto relative bg-[#F4F7FB]">
          {children}
        </div>

        {/* iOS Home indicator on desktop frame */}
        <div className="hidden sm:flex justify-center items-center py-2 bg-white z-20 shrink-0 border-t border-slate-100">
          <div className="w-28 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </main>
  );
};
