import styled from 'styled-components'
import { useSendMessage } from '../hooks/use-send-message'
import { Button } from 'shared'
import { IoSend } from 'react-icons/io5'
import TemplatesListSidebar from 'widget/template-list-sidebar'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectCurrentTemplateSidebar,
    setOpenSidebar,
} from 'features/template/model'
import { BsChatLeftText } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { selectCurrentText, setText } from 'entities/text'

let shift = false

export const MessageTools = ({ currentChat }) => {
    const text = useSelector(selectCurrentText)
    const sendMessageHandler = useSendMessage()
    const dispatch = useDispatch()
    const openSidebar = useSelector(selectCurrentTemplateSidebar)

    const clickHandler = () => {
        if (text.trim().length > 0) {
            sendMessageHandler(currentChat, text)
            dispatch(setText(''))
        }
    }

    const keyDownHandler = (e) => {
        if (e.keyCode === 16) {
            shift = true
        }
        if (e.keyCode === 13 && !shift) {
            e.preventDefault()
            clickHandler()
        }
    }

    const keyUpHandler = (e) => {
        if (e.keyCode === 16) {
            shift = false
        }
    }

    return (
        <Main>
            <Input
                value={text}
                rows={3}
                placeholder="Сообщение"
                onChange={(e) => dispatch(setText(e.target.value))}
                onKeyDown={keyDownHandler}
                onKeyUp={keyUpHandler}
            />
            <Buttons>
                <FileIcon>
                    {!openSidebar ? (
                        <BsChatLeftText
                            onClick={() => dispatch(setOpenSidebar(true))}
                        />
                    ) : (
                        <IoCloseSharp
                            onClick={() => dispatch(setOpenSidebar(false))}
                        />
                    )}
                </FileIcon>

                <Button
                    buttonProps={{
                        onClick: clickHandler,
                        style: {
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            fontSize: '20px',
                        },
                    }}
                >
                    <IoSend />
                </Button>
            </Buttons>
            <TemplatesListSidebar />
        </Main>
    )
}

const Main = styled.div`
    height: 90px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.grey};
`

const Input = styled.textarea`
    resize: none;
    outline: none;
    font-size: 18px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    width: calc(100%);
    font-family: 'Lato', sans-serif;
`

const FileIcon = styled.div`
    font-size: 35px;
    margin-top: 8px;
    color: grey;
`

const Buttons = styled.div`
    width: 120px;
    padding: 0 20px;
    align-self: flex-end;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-around;
`
