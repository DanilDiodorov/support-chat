import { $api } from 'shared'

export const deleteTemplateApi = async (data) => {
    const response = await $api.delete(`/template/delete?id=${data.id}`)
    return response.data
}
