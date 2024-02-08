import { TemplatesList, selectCurrentTemplateSidebar } from 'features/template'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const TemplatesListSidebar = () => {
    const templateSidebar = useSelector(selectCurrentTemplateSidebar)

    return (
        <Main active={templateSidebar}>
            <TemplatesList />
        </Main>
    )
}

const Main = styled.div`
    transform: translateX(${({ active }) => (active ? '0' : '100%')});
    transition: all 0.3s;
    position: fixed;
    width: 400px;
    height: 100vh;
    right: 0;
    top: 0;
    background-color: #fff;
    border-left: 1px solid ${({ theme }) => theme.colors.grey};
    z-index: 1000;
`

export default TemplatesListSidebar
