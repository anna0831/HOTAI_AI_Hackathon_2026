import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OfflineStatusBar } from './components/OfflineStatusBar';
import { ChicBottomNav } from './components/ChicBottomNav';
import { MobileFrame } from './components/MobileFrame';
import { AppRouter } from './app/router';
import { localPackStore } from './services/localPackStore';

export const App: React.FC = () => {
  useEffect(() => {
    // Ensure default offline pack is seeded for seamless demo
    localPackStore.ensureDefaultPack();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#171B28]">
        {/* Top Environment Simulator Bar */}
        <OfflineStatusBar />

        {/* Center Mobile Viewport */}
        <MobileFrame>
          <AppRouter />
        </MobileFrame>

        {/* Bottom 90-Second Demo Navigation Bar */}
        <ChicBottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
