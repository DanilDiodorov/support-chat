import { $api } from 'shared'

export const getChats = async () => {
    const response = await $api.get('chat')
    return response.data
}
