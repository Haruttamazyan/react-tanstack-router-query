import { createFileRoute } from '@tanstack/react-router'
import SearchInput from '../../features/user/components/SearchInput'
import UsersTable from '../../features/user/components/UsersTable'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import UserService from '../../api/services/user/query'
import Spinner from '../../components/Loader'
//import ModalProvider from '../../providers/ModalProvider'
import CreateUserButton from '../../features/user/components/CreateUserButton'
//import UserModal from '../../features/user/components/UserModal'
import z from 'zod'
import queryClient from '../../api/QueryClient'

const searchSchema = z.object({
  search: z.string().default(''),
})

const userQueryOptions = queryOptions({
    queryKey: ['users'],
    queryFn: UserService.getUser,
  })

export const Route = createFileRoute('/_auth/users')({
  loader: () => queryClient.ensureQueryData(userQueryOptions),
  component: UserComponent,
  validateSearch: searchSchema
})

function UserComponent() {
  const { data: users, isFetching } = useSuspenseQuery(userQueryOptions)

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <CreateUserButton />
        <SearchInput />
      </div>
      <UsersTable users={users} />
    </div>
  )
}
