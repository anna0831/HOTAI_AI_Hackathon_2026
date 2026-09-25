import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CampaignLandingPage } from '../pages/CampaignLandingPage';
import { TravelProfilePage } from '../pages/TravelProfilePage';
import { TripOverviewPage } from '../pages/TripOverviewPage';
import { EsimRecommendationPage } from '../pages/EsimRecommendationPage';
import { PackBuilderPage } from '../pages/PackBuilderPage';
import { CompanionPage } from '../pages/CompanionPage';
import { TravelCardPage } from '../pages/TravelCardPage';
import { EvidencePage } from '../pages/EvidencePage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CampaignLandingPage />} />
      <Route path="/result" element={<TravelProfilePage />} />
      <Route path="/trip" element={<TripOverviewPage />} />
      <Route path="/esim" element={<EsimRecommendationPage />} />
      <Route path="/pack" element={<PackBuilderPage />} />
      <Route path="/companion" element={<CompanionPage />} />
      <Route path="/share" element={<TravelCardPage />} />
      <Route path="/evidence" element={<EvidencePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
