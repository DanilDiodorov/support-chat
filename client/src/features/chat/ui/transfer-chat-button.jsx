import { Button } from 'shared'
import { TransferChatPopup } from './transfer-chat-popup'
import { useState } from 'react'

export const TransferChatButton = ({ currentChat }) => {
    const [active, setActive] = useState(false)

    return (
        <>
            <TransferChatPopup
                active={active}
                setActive={setActive}
                currentChat={currentChat}
            />
            <Button buttonProps={{ onClick: () => setActive(true) }}>
                Перевести
            </Button>
        </>
    )
}
