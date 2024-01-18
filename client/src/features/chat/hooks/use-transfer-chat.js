import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { transferChat } from '../api/transfer-chat'
import { toast } from 'sonner'
import { removeChat } from 'entities/chat'
import { useNavigate } from 'react-router-dom'

export const useTransferChat = (currentChat, setActive) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const transferChatMutation = useMutation({
        mutationFn: transferChat,
        onSuccess: () => {
            dispatch(removeChat(currentChat.id))
            setActive(false)
            queryClient.invalidateQueries(['chat'])
            return navigate('/')
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return transferChatMutation
}
