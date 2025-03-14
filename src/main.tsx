import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { OAuthCallback } from './components/OAuthCallback.tsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx';
import { TermsConditions } from './pages/TermsConditions.tsx';
import { DataDeletion } from './pages/DataDeletion.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/oauth/callback',
    element: <OAuthCallback />,
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/terms',
    element: <TermsConditions />,
  },
  {
    path: '/data-deletion',
    element: <DataDeletion />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);