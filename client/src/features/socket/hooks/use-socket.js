import { useQueryClient } from '@tanstack/react-query'
import { addChat } from 'entities/chat'
import { addMessage } from 'entities/message'
import { selectCurrentUser } from 'entities/user'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import messageSound from './../assets/message.mp3'

let flag = false

export const useSocket = () => {
    const user = useSelector(selectCurrentUser)
    const [socket, setSocket] = useState(null)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [isTabActive, setIsTabActive] = useState(false)

    useEffect(() => {
        if (user && !flag) {
            const Socket = io(process.env.REACT_APP_SOCKET_API_URL, {
                withCredentials: true,
                id: user.id,
                query: {
                    operatorId: user.id,
                    destinationId: user.destinationId,
                },
            })
            setSocket(Socket)
            flag = true
        }
        if (!user) {
            flag = false
        }
    }, [user])

    useEffect(() => {
        const handleWindowFocus = () => {
            setIsTabActive(true)
        }
        const handleWindowBlur = () => {
            setIsTabActive(false)
        }
        window.addEventListener('focus', handleWindowFocus)
        window.addEventListener('blur', handleWindowBlur)

        return () => {
            window.removeEventListener('focus', handleWindowFocus)
            window.removeEventListener('blur', handleWindowBlur)
        }
    }, [])

    useEffect(() => {
        socket?.on('chat:add', (data) => {
            dispatch(addChat(data))
        })
        socket?.on('message:add', (data) => {
            const audio = new Audio(messageSound)
            try {
                if (!isTabActive) audio.play()
            } catch (error) {}
            dispatch(addMessage(data))
        })
        socket?.on('chat:transfer', () => {
            queryClient.invalidateQueries(['chat'])
        })

        return () => {
            socket?.removeAllListeners()
        }
    }, [socket, dispatch, queryClient, isTabActive])
}
