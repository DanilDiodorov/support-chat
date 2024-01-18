import { useQuery } from '@tanstack/react-query'
import { getChats } from '../api/get-chats'

export const useGetChats = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['chat'],
        queryFn: getChats,
    })

    return { data, isLoading, isError, error }
}
