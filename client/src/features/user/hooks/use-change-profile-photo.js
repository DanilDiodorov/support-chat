import { useMutation } from '@tanstack/react-query'
import { changeProfilePhoto } from '../api/change-profile-photo'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { changeAvatarStatus } from 'entities/user'

export const useChangeProfilePhoto = () => {
    const dispatch = useDispatch()

    const changeProfilePhotoMutation = useMutation({
        mutationFn: changeProfilePhoto,
        onError: (error) => {
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            dispatch(changeAvatarStatus(false))
            dispatch(changeAvatarStatus(true))
        },
    })

    return changeProfilePhotoMutation
}
