import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from '@/pages/HomePage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from '@/pages/LoginPage.jsx'
import ResultsPage from '@/pages/ResultsPage.jsx'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/results',
    element: <ResultsPage />
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* To display info as toast*/}
    <Toaster />
    {/*To query*/}
    <QueryClientProvider client={queryClient}>
      {/*To navigate*/}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
