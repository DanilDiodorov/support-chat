import styled from 'styled-components'
import { useGetTemplates } from '../hooks/use-get-templates'
import { EditableTemplateBlock } from './editable-template-block'
import { Button } from 'shared'
import { useState } from 'react'
import { TemplatePopup } from './template-popup'

export const EditableTempatesList = () => {
    const { data } = useGetTemplates()
    const [active, setActive] = useState(false)

    return (
        <Main>
            <TemplatePopup active={active} setActive={setActive} />
            <ButtonBlock>
                <Button
                    buttonProps={{
                        style: { width: '200px' },
                        onClick: () => setActive(true),
                    }}
                >
                    Добавить
                </Button>
            </ButtonBlock>
            {data?.map((item) => (
                <EditableTemplateBlock key={item.id} template={item} />
            ))}
            {data?.length === 0 && <Message>Пусто</Message>}
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
    justify-content: center;
`

const Message = styled.div`
    text-align: center;
    padding: 30px 0;
`
