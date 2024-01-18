import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { logout } from '../api/logout'
import { toast } from 'sonner'
import { clearUser } from 'entities/user'

export const useLogout = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            dispatch(clearUser())
            window.location.reload(false)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return logoutMutation
}
