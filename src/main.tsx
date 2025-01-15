import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuth } from './providers/AuthProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './api/QueryClient'
import ModalProvider, { useModalContext } from './providers/ModalProvider'
import { ModalRoot } from './components/Modals'

import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { ToastContainer } from 'react-toastify'
import ErrorComponent from './components/ErrorComponent'
import  Spinner  from './components/Loader'



export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Spinner />,
  defaultErrorComponent: ({error}) => <ErrorComponent error={error} />,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  const auth = useAuth()
  const modal = useModalContext()
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{auth, modal }} />
    </QueryClientProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="p-5 bg-white dark:bg-gray-900 antialiased">
      <AuthProvider>
        <ModalProvider>
          <App />
          <ModalRoot />
          <ToastContainer
            position='bottom-right'
            theme='dark'
          />
        </ModalProvider>
      </AuthProvider> 
    </div>
  </StrictMode>,
)
