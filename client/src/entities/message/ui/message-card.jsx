import { OperatorPhoto } from 'entities/user'
import { ProfilePhoto } from 'shared'
import { getTime } from 'shared/utils/get-time'
import styled from 'styled-components'
import { TextMessage } from './text-message'
import { FileMessage } from './file-message'

export const MessageCard = ({ message, currentChat }) => {
    return (
        <Main isOperator={message.isOperator}>
            <Header>
                <Photo>
                    {message.isOperator ? (
                        <OperatorPhoto size="50px" status="none" />
                    ) : (
                        <ProfilePhoto
                            name={currentChat.clientName}
                            url={
                                message.isOperator
                                    ? 'http://localhost:3001/file/image'
                                    : ''
                            }
                            size="50px"
                            status="none"
                        />
                    )}
                </Photo>
                <Info>
                    <Name>
                        {message.isOperator ? 'Вы' : currentChat.clientName}
                    </Name>
                    <Time>{getTime(Number(message.createdAt))}</Time>
                </Info>
            </Header>
            <Content>
                {message.type === 'text' ? (
                    <TextMessage text={message.text} />
                ) : (
                    <FileMessage url={message.url} />
                )}
            </Content>
        </Main>
    )
}

const Main = styled.div`
    background-color: white;
    padding: 15px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    border: 1px solid
        ${({ theme, isOperator }) =>
            isOperator ? 'transparent' : theme.colors.grey};
`

const Header = styled.div`
    display: flex;
    align-items: center;
`

const Photo = styled.div``

const Info = styled.div`
    margin-left: 10px;
`

const Name = styled.div``

const Time = styled.div`
    margin-top: 5px;
    font-size: 12px;
    color: grey;
`

const Content = styled.div`
    margin-top: 15px;
`
