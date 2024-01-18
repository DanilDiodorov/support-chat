import { $api } from 'shared'

export const getOperators = async (data) => {
    const response = await $api.get(`user/users?destinationId=${data}`)
    return response.data
}
