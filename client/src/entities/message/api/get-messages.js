import { $api } from 'shared'

export const getMessages = async () => {
    const response = await $api.get('/message')
    return response.data
}
