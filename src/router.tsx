import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import TrackingPage from '@/pages/TrackingPage'
import AnalysePage from '@/pages/AnalysePage'
import SettingsPage from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'spiel/:id/tracking',
        element: <TrackingPage />,
      },
      {
        path: 'spiel/:id/analyse',
        element: <AnalysePage />,
      },
      {
        path: 'einstellungen',
        element: <SettingsPage />,
      },
    ],
  },
])
