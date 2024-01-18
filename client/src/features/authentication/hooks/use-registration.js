import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registration } from '../api/registration'
import { useDispatch } from 'react-redux'
import { setUser } from 'entities/user'
import { toast } from 'sonner'

export const useRegistration = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    const registrationMutation = useMutation({
        mutationFn: registration,
        onSuccess: (response) => {
            dispatch(setUser(response.data.user))
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return registrationMutation
}
