import { $api } from 'shared'

export const changePassword = async (data) => {
    return await $api.patch('/user/password', data)
}
