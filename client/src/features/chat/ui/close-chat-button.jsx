import { Button } from 'shared'
import { useCloseChat } from '../hooks/use-close-chat'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'entities/user'

export const CloseChatButton = ({ currentChat }) => {
    const closeChatMutation = useCloseChat(currentChat)
    const user = useSelector(selectCurrentUser)

    const handleClick = () => {
        closeChatMutation.mutate({
            chatId: currentChat.id,
            clientId: currentChat.clientId,
            operatorId: user.id,
            operatorFirstName: user.firstName,
            operatorLastName: user.lastName,
            operatorAvatarUrl: '',
        })
    }

    return (
        <Button
            buttonProps={{
                onClick: handleClick,
            }}
            isLoading={closeChatMutation.isPending}
        >
            Завершить
        </Button>
    )
}
