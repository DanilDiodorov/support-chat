import { $api } from 'shared'

export const addTemplateApi = async (data) => {
    const response = await $api.post('/template/create', data)
    return response.data
}
