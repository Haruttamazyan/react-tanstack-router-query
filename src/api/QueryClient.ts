import { QueryCache, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: true,
      }
    },
    queryCache: new QueryCache({
      onError(error) {
        console.error('query Error ===>', error)
      },
    })
  })


export default queryClient