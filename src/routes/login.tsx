import { zodResolver } from '@hookform/resolvers/zod'
import {
  createFileRoute,
  
  useRouter,
} from '@tanstack/react-router'
//import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import TextInput from '../components/ui/TextInput'
import useKeyDown from '../hooks/useKeyDown'
import { useLogin } from '../api/services/auth/mutations'
import { useAuth } from '../providers/AuthProvider'

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(8, { message: "Must contain at least 8 character(s)" }),
})

type LoginFormFields = z.infer<typeof loginFormSchema>

export const Route = createFileRoute('/login')({
  component: Login,
  // beforeLoad: ({ context }) => {
  //   console.log(context.auth)
  //   if (context.auth?.isAuthenticated) {
  //     throw redirect({ to: '/users' })
  //   }
  // },
})

function Login() {
  const router = useRouter()
  const auth = useAuth()
  const navigate = Route.useNavigate()
  const { mutate: login, isPending } = useLogin()
  const { control, handleSubmit, setError, formState: {errors} } = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange", // Validate on each change
    reValidateMode: "onChange", // Revalidate on blur
  })

  const onSubmit: SubmitHandler<LoginFormFields> = 
    async (data) => {
      login(data, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: async (res: any) => {
          await auth.login(res.msg.token)
    
          await router.invalidate();

          router.invalidate().finally(() => {
            navigate({ to: '/users', search : {search: ''} })
          })          
          
        },
        onError: () => {
          setError('root', {
            message: "Username or password incorrect"
          })
        }
      })
    }
  

  useKeyDown('Enter', handleSubmit(onSubmit))

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className=""
            src="/vite.svg"
            alt="logo"
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                control={control}
                name="username"
                label="Enter Username"
                placeholder="Username"
              />
              <TextInput
                control={control}
                type='password'
                name="password"
                label="Enter Password"
                placeholder="••••••••"
              />

               {errors.root &&   <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.root.message?.toString()}.</p>}

              <button
                disabled={isPending}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {!isPending ? 'Sign in' : 'Loading...'}
              </button>
             
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
