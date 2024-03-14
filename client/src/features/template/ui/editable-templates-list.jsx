import styled from 'styled-components'
import { useGetTemplates } from '../hooks/use-get-templates'
import { EditableTemplateBlock } from './editable-template-block'
import { Button, TextField } from 'shared'
import { useEffect, useState } from 'react'
import { TemplatePopup } from './template-popup'

export const EditableTempatesList = () => {
    const { data } = useGetTemplates()
    const [active, setActive] = useState(false)
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
            <TemplatePopup active={active} setActive={setActive} />
            <ButtonBlock>
                <Button
                    buttonProps={{
                        style: { width: '100px' },
                        onClick: () => setActive(true),
                    }}
                >
                    Добавить
                </Button>
            </ButtonBlock>
            <TextField
                inputProps={{
                    placeholder: 'Поиск',
                    onChange: (e) => setSearchText(e.target.value),
                    value: searchText,
                }}
            />
            {filtredData?.map((item) => (
                <EditableTemplateBlock key={item.id} template={item} />
            ))}
            {filtredData?.length === 0 && <Message>Пусто</Message>}
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    width: 700px;
`

const ButtonBlock = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`

const Message = styled.div`
    text-align: center;
    padding: 30px 0;
`
