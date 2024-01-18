import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '../api/send-message'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from 'entities/message'
import { selectCurrentUser } from 'entities/user'

export const useSendMessage = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)

    const sendMessageHandler = (chat, text) => {
        const newMessage = {
            id: uuidv4(),
            chatId: chat.id,
            operatorId: user.id,
            operatorFirstName: user.firstName,
            operatorLastName: user.lastName,
            clientId: chat.clientId,
            text,
            createdAt: Date.now(),
            type: 'text',
            isOperator: true,
        }
        sendMessageMutation.mutate(newMessage)
        dispatch(addMessage(newMessage))
    }

    const sendMessageMutation = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['add-message'] })
        },
    })

    return sendMessageHandler
}
