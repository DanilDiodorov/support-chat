import { useQueryClient } from '@tanstack/react-query'
import { useGetOperators } from 'entities/operator'
import { useEffect, useState } from 'react'
import { PopupLayout, TextField } from 'shared'
import styled from 'styled-components'
import { OperatorCard } from './operator-card'
import { useTransferChat } from '../hooks/use-transfer-chat'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'entities/user'

export const TransferChatPopup = ({ active, setActive, currentChat }) => {
    const { data } = useGetOperators()
    const queryClient = useQueryClient()
    const [value, setValue] = useState(null)
    const [operators, setOperators] = useState([])
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFiltredData] = useState([])
    const transferChatMutation = useTransferChat(currentChat, setActive)
    const user = useSelector(selectCurrentUser)

    useEffect(() => {
        if (active) queryClient.invalidateQueries(['operator'])
    }, [active, queryClient])

    useEffect(() => {
        if (searchText && operators)
            setFiltredData(
                operators.filter((operator) => {
                    const fullName = `${operator.firstName} ${operator.lastName}`
                    return fullName
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                })
            )
        else if (!searchText && operators) {
            setFiltredData(operators)
        }
    }, [searchText, operators])

    useEffect(() => {
        if (data)
            setOperators(
                data.users.map((operator) => {
                    return {
                        ...operator,
                        status: data.online.includes(operator.id.toString())
                            ? 'online'
                            : 'offline',
                    }
                })
            )
    }, [data])

    const handleConfirm = () => {
        transferChatMutation.mutate({
            chatId: currentChat.id,
            targetOperatorId: value.id,
            operatorFullName: user.firstName + ' ' + user.lastName,
            targetOperatorFullName: value.fullName,
        })
    }

    return (
        <PopupLayout
            title="Перевести чат на другого оператора"
            active={active}
            setActive={setActive}
            disabled={value ? false : true}
            onConfirm={handleConfirm}
            isLoading={transferChatMutation.isPending}
        >
            <TextField
                inputProps={{
                    placeholder: 'Поиск',
                    onChange: (e) => setSearchText(e.target.value),
                    value: searchText,
                }}
            />
            <Content>
                {filteredData.map((user) => (
                    <OperatorCard
                        key={user.id}
                        operator={user}
                        setValue={setValue}
                        value={value}
                    />
                ))}
            </Content>
        </PopupLayout>
    )
}

const Content = styled.div`
    overflow-y: auto;
    max-height: 400px;
`
