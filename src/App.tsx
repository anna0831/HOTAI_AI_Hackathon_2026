import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OfflineStatusBar } from './components/OfflineStatusBar';
import { ChicBottomNav } from './components/ChicBottomNav';
import { MobileFrame } from './components/MobileFrame';
import { AppRouter } from './app/router';
import { localPackStore } from './services/localPackStore';
import {
  registerServiceWorker,
  cacheTravelDnaAssets,
  cacheSeoulItineraryAssets,
} from './services/offlineAssetCache';

export const App: React.FC = () => {
  useEffect(() => {
    // Ensure default offline pack is seeded for seamless demo
    localPackStore.ensureDefaultPack();

    // Defer heavy background asset caching to idle time so first paint & interactivity are instant
    const scheduleBackgroundCaching = () => {
      registerServiceWorker();
      cacheTravelDnaAssets();
      cacheSeoulItineraryAssets();
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handle = (window as any).requestIdleCallback(scheduleBackgroundCaching, { timeout: 2500 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => (window as any).cancelIdleCallback?.(handle);
    } else {
      const timer = setTimeout(scheduleBackgroundCaching, 1200);
      return () => clearTimeout(timer);
    }
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
