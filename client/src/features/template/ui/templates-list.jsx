import styled from 'styled-components'
import { useGetTemplates } from '../hooks/use-get-templates'
import { TemplateBlock } from './template-block'
import { Link } from 'react-router-dom'

export const TemplatesList = () => {
    const { data } = useGetTemplates()

    return (
        <Main>
            {data?.map((item) => (
                <TemplateBlock key={item.id} template={item} />
            ))}
            {data?.length === 0 && (
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
