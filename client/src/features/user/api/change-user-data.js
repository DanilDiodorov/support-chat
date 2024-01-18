import { $api } from 'shared'

export const changeUserData = async (data) => {
    return await $api.patch('/user/data', data)
}
