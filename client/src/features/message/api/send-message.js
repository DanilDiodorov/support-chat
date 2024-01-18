const { $api } = require('shared')

export const sendMessage = async (data) => {
    await $api.post('/message', data)
}
