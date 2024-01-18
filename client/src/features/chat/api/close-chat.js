import { $api } from 'shared'

export const closeChat = async (data) => {
    console.log(data)
    return await $api.post(`/chat-close`, data)
}
