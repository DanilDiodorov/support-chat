import { $api } from 'shared'

export const registration = async (data) => {
    return await $api.post('/user/registration', data)
}
