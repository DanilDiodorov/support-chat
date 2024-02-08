import { $api } from 'shared'

export const udpateTemplateApi = async (data) => {
    const response = await $api.patch('/template/update', data)
    return response
}
