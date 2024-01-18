import { $api } from 'shared'

export const login = async (data) => {
    return $api.post('/user/login', data)
}
