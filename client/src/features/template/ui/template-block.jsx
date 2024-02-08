import { setText } from 'entities/text'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setOpenSidebar } from '../model'

export const TemplateBlock = ({ template }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setText(template.text))
        dispatch(setOpenSidebar(false))
    }

    return <Main onClick={handleClick}>{template.text}</Main>
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
