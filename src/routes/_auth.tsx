import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { useAuth } from '../providers/AuthProvider'
import { useCallback } from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  // beforeLoad: ({context}) => {
  //   console.log('auth context===>', context.auth?.isAuthenticated)
  //   if(!context.auth?.isAuthenticated){
  //     throw redirect({to: '/login'})
  //   }
  // }
})

function RouteComponent() {
  const auth = useAuth()
  const router = useRouter()
  const navigate = useNavigate()
  const logout = useCallback(async () => {
    auth.logout()
    await router.invalidate()
    router.navigate({ to: '/login' })
  }, [auth, navigate])

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mr-auto ">
          <a
            href="vite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/vite.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              onClick={logout}
              href="#"
              className="  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
