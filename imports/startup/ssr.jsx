import React from 'react';
import { renderWithSSR } from 'meteor/communitypackages:react-router-ssr';
import AppShell from '/imports/ui/layouts/AppShell.jsx';
import LandingPage from '/imports/ui/pages/LandingPage.jsx';
import CampaignList from '/imports/ui/pages/CampaignList.jsx';
import CampaignView from '/imports/ui/pages/CampaignView.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';

const withShell = (el) => <AppShell>{el}</AppShell>;

const AppRoutes = [
  { path: '/', element: withShell(<LandingPage />) },
  { path: '/campaigns', element: withShell(<CampaignList />) },
  { path: '/campaigns/:id', element: withShell(<CampaignView />) },
  { path: '*', element: withShell(<NotFound />) },
];

renderWithSSR(AppRoutes, { renderTarget: 'react-app' });

export default AppRoutes;
