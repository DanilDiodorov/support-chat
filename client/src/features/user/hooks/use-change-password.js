import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../api/change-password'
import { toast } from 'sonner'

export const useChangePassword = (setValue) => {
    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onError: (error) => {
            setValue('password', '')
            setValue('password_2', '')
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            setValue('password', '')
            setValue('password_2', '')
            toast.success('Пароль успешно изменён')
        },
    })

    return changePasswordMutation
}
