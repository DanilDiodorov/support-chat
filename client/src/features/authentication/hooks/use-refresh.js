import { useQuery } from '@tanstack/react-query'
import { clearUser, setUser } from 'entities/user'
import { useDispatch } from 'react-redux'
import { refresh } from '../api/refresh'
import { useEffect } from 'react'

export const useRefresh = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: refresh,
        retry: 0,
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isError && data) {
            dispatch(setUser(data.user))
        } else {
            dispatch(clearUser())
        }
    }, [data, isError, dispatch])

    return isLoading
}
