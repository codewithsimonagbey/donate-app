// /imports/startup/client.jsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '/imports/ui/router/AppRouter.jsx';

const start = () => {
  const root = document.getElementById('react-app'); // match main.html id
  hydrateRoot(
    root,
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

Meteor.startup(start);

export default start;
