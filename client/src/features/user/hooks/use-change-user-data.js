import { useMutation } from '@tanstack/react-query'
import { changeUserData } from '../api/change-user-data'
import { toast } from 'sonner'

export const useChangeUserData = () => {
    const changeUserDataMutation = useMutation({
        mutationFn: changeUserData,
        onError: (error) => {
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            window.location.reload(false)
        },
    })

    return changeUserDataMutation
}
