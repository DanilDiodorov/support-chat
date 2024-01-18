import { $api } from 'shared'

export const transferChat = async (data) => {
    const response = $api.patch('/chat-transfer', data)
    return response.data
}
