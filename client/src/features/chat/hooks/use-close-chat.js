import { useMutation, useQueryClient } from '@tanstack/react-query'
import { closeChat } from '../api/close-chat'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeChat } from 'entities/chat'
import { removeChatMessages } from 'entities/message'

export const useCloseChat = (currentChat) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const closeChatMutation = useMutation({
        mutationFn: closeChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat'] })
            queryClient.invalidateQueries({ queryKey: ['message'] })
            dispatch(removeChat(currentChat.id))
            dispatch(removeChatMessages(currentChat.id))
            return navigate('/')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return closeChatMutation
}
