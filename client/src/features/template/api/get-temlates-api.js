import { $api } from 'shared'

export const getTemplatesApi = async () => {
    const response = await $api.get('/template/get')
    return response.data
}
