import axios from 'axios'

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Barear ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                originalRequest._isRetry = true
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/refresh`,
                    {
                        withCredentials: true,
                    }
                )
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log(e)
            }
        }
        throw error
    }
)
