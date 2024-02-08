import { EditableTempatesList } from 'features/template'
import styled from 'styled-components'

const TemplatesPage = () => {
    return (
        <Main>
            <EditableTempatesList />
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    justify-content: center;
    overflow: auto;
`

export default TemplatesPage
