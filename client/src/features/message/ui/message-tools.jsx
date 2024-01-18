import styled from 'styled-components'
import { useSendMessage } from '../hooks/use-send-message'
import { useState } from 'react'
import { Button } from 'shared'
import { SlPaperClip } from 'react-icons/sl'
import { IoSend } from 'react-icons/io5'

let shift = false

export const MessageTools = ({ currentChat }) => {
    const [text, setText] = useState()
    const sendMessageHandler = useSendMessage()

    const clickHandler = () => {
        if (text.trim().length > 0) {
            sendMessageHandler(currentChat, text)
            setText('')
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
                onChange={(e) => setText(e.target.value)}
                onKeyDown={keyDownHandler}
                onKeyUp={keyUpHandler}
            />
            <Buttons>
                <FileIcon>
                    <SlPaperClip />
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
