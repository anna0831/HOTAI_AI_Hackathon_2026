import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConnectionStatus } from './components/ConnectionStatus';
import { DemoStepper } from './components/DemoStepper';
import { MobileFrame } from './components/MobileFrame';
import { AppRouter } from './app/router';
import { localPackStore } from './services/localPackStore';

export const App: React.FC = () => {
  useEffect(() => {
    // Ensure default offline pack is seeded on initial load for flawless offline demo
    localPackStore.ensureDefaultPack();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 select-none">
        {/* Top Environment Simulator Bar */}
        <ConnectionStatus />

        {/* Center Mobile Viewport */}
        <MobileFrame>
          <AppRouter />
        </MobileFrame>

        {/* Bottom 90-Second Demo Navigation Bar */}
        <DemoStepper />
      </div>
    </BrowserRouter>
  );
};

export default App;
