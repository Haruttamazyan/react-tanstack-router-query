import * as React from 'react'
import { Outlet, createRootRoute, redirect } from '@tanstack/react-router'
//import type {authContextType} from '../providers/AuthProvider'
//import type { QueryClient } from '@tanstack/react-query'

// interface MyRouterContext {
//     auth: authContextType,
//    // queryClient: QueryClient
//   }

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async ({ location }) => {
    const token = localStorage.getItem('token')
    const isAuthRoute = location.pathname === '/login';
    
    // Redirect authenticated users away from auth routes
    if (token && isAuthRoute) {
      throw redirect({
        to: '/users',
        search: {
          search: ''
        }
      });
    }
    
    // Allow access to public routes
    const publicRoutes = ['/', '/login'];
    if (publicRoutes.includes(location.pathname)) {
      return;
    }
    
    // Protect other routes
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
