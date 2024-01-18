import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const withQuery = (component) => () => {
    return (
        <QueryClientProvider client={queryClient}>
            {component()}
        </QueryClientProvider>
    )
}

export default withQuery
