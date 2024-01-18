import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { login } from '../api/login'
import { setUser } from 'entities/user'
import { toast } from 'sonner'

export const useLogin = (setValue) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            dispatch(setUser(response.data.user))
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            setValue('password', '')
            toast.error(error.response.data.message)
        },
    })

    return loginMutation
}
