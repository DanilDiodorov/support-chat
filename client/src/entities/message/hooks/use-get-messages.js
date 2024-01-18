import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../api/get-messages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setMessages } from '../model'

export const useGetMessages = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['message'],
        queryFn: getMessages,
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(error.response.data.messasge)
        } else if (!isLoading) {
            dispatch(setMessages(data))
        }
    }, [data, dispatch, isError, isLoading, error])

    return { isLoading }
}
