import { useMutation } from '@tanstack/react-query'
import { deleteProfilePhoto } from '../api/delete-profile-photo'

export const useDeleteProfilePhoto = () => {
    const deleteProfilePhotoMutation = useMutation({
        mutationFn: deleteProfilePhoto,
        onSuccess: () => {
            window.location.reload(false)
        },
        onError: (error) => {
            console.log(error)
        },
    })

    return deleteProfilePhotoMutation
}
