import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from '/imports/ui/layouts/AppShell.jsx';
import LandingPage from '/imports/ui/pages/LandingPage.jsx';
import CampaignList from '/imports/ui/pages/CampaignList.jsx';
import CampaignView from '/imports/ui/pages/CampaignView.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';

const AppRouter = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/campaigns" element={<CampaignList />} />
      <Route path="/campaigns/:id" element={<CampaignView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppShell>
);

export default AppRouter;
