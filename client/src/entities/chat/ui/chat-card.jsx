import styled from 'styled-components'
import { Link, ProfilePhoto } from 'shared'
import { useParams } from 'react-router-dom'
import { getTime } from 'shared/utils/get-time'

export const ChatCard = ({
    chat,
    lastMessageText,
    lastMessageTime,
    newMessagesCount,
}) => {
    const { chatId } = useParams()

    return (
        <LocalLink to={`chats/${chat.id}`}>
            <Main active={chatId?.toString() === chat.id.toString()}>
                <ProfilePhoto
                    name={chat.clientName}
                    size="60px"
                    status="none"
                    style={{ marginLeft: '10px' }}
                />
                <InfoBlock>
                    <Name>{chat.clientName}</Name>
                    <Text>{lastMessageText}</Text>
                    <RightBlock>
                        {lastMessageTime && getTime(Number(lastMessageTime))}
                    </RightBlock>
                    {Number(newMessagesCount) > 0 && (
                        <NewMessagesCount>{newMessagesCount}</NewMessagesCount>
                    )}
                </InfoBlock>
            </Main>
        </LocalLink>
    )
}

const LocalLink = styled(Link)`
    color: ${({ theme }) => theme.colors.text};
`

const Main = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    align-items: center;
    padding: 15px 0px;
    width: 100%;
    background-color: ${({ theme, active }) =>
        active ? theme.colors.grey : 'white'};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme, active }) =>
            active ? theme.colors.grey : '#f0f0f0'};
    }
`

const InfoBlock = styled.div`
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    gap: 3px;
    position: relative;
`

const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
`

const Text = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    color: grey;
`

const RightBlock = styled.div`
    font-size: 12px;
    color: grey;
`

const NewMessagesCount = styled.div`
    position: absolute;
    right: 10px;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 12px;
`
