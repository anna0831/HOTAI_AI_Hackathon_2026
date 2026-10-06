export interface DemoStepItem {
  path: string;
  label: string;
  title: string;
}

export const DEMO_STEPS: DemoStepItem[] = [
  { path: '/', label: '01 測驗入口', title: 'GenAI 互動創造話題' },
  { path: '/result', label: '02 旅人畫像', title: '個人化 DNA 與社群卡' },
  { path: '/trip', label: '03 行程洞察', title: '首爾五日需求分析' },
  { path: '/esim', label: '04 eSIM 導購', title: '情境推薦與促購理由' },
  { path: '/pack', label: '05 守護包解鎖', title: '購買後解鎖 Killer Benefit' },
  { path: '/companion', label: '06 離線 AI 旅伴', title: '離線可用・時效閘道' },
  { path: '/share', label: '07 旅後分享', title: '社群裂變 Referral Loop' },
  { path: '/evidence', label: '08 決策儀表板', title: 'Funnel 數據與架構評分' },
];
