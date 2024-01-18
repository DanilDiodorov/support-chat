import { $api } from 'shared'

export const changeProfilePhoto = async (data) => {
    return await $api.post('/user/photo', data, {
        headers: {
            'Content-type': 'multipart/form-data',
        },
    })
}
