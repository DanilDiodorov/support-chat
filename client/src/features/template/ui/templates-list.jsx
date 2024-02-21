import styled from 'styled-components'
import { useGetTemplates } from '../hooks/use-get-templates'
import { TemplateBlock } from './template-block'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TextField } from 'shared'

export const TemplatesList = () => {
    const { data } = useGetTemplates()
    const [searchText, setSearchText] = useState('')
    const [filtredData, setFiltredData] = useState([])

    useEffect(() => {
        if (data) {
            setFiltredData(
                data.filter(({ text }) =>
                    text.toLowerCase().includes(searchText.toLowerCase())
                )
            )
        }
    }, [data, searchText])

    return (
        <Main>
            <TextField
                inputProps={{
                    placeholder: 'Поиск',
                    onChange: (e) => setSearchText(e.target.value),
                    value: searchText,
                }}
            />
            {filtredData?.map((item) => (
                <TemplateBlock key={item.id} template={item} />
            ))}
            {filtredData?.length === 0 && (
                <Message>
                    Пусто. <Link to="/templates">Добавить шаблон</Link>
                </Message>
            )}
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    overflow: auto;
    height: calc(100% - 40px);
`

const Message = styled.div`
    text-align: center;
`
