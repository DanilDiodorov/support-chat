import { $api } from 'shared'

export const logout = async () => {
    return await $api.get('/user/logout')
}
