import { $api } from 'shared'

export const deleteProfilePhoto = async () => {
    console.log('DELETE PROCESS')
    const response = await $api.delete('/user/photo')
    return response.data
}
