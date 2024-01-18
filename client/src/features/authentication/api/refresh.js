import { $api } from 'shared'

export const refresh = async () => {
    const response = await $api.get('/user/refresh')
    return response.data
}
