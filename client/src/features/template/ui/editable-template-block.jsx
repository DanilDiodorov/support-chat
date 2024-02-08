import styled from 'styled-components'
import { TemplatePopup } from './template-popup'
import { useState } from 'react'

export const EditableTemplateBlock = ({ template }) => {
    const [active, setActive] = useState(false)

    return (
        <Main onClick={() => setActive(true)}>
            <TemplatePopup
                active={active}
                setActive={setActive}
                defaultValue={template.text}
                id={template.id}
            />
            {template.text}
        </Main>
    )
}

const Main = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.grey};
    padding: 10px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    background-color: ${({ theme }) => theme.colors.bgContent};
    white-space: pre-wrap;

    &:hover {
        cursor: pointer;
        outline: solid ${({ theme }) => theme.colors.grey};
    }
`
