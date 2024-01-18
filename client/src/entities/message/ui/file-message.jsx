import styled from 'styled-components'
import { FaFileAlt } from 'react-icons/fa'

export const FileMessage = ({ url }) => {
    return (
        <Main>
            <Icon>
                <FaFileAlt />
            </Icon>
            <a href={url}>Скачать</a>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Icon = styled.div`
    font-size: 30px;
    color: grey;
`
