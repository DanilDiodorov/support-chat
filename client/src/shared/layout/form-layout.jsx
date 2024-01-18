import styled from 'styled-components'

export const FormLayout = ({
    children,
    title,
    footerContent,
    width = '400px',
}) => {
    return (
        <Main>
            {title && <Title>{title}</Title>}
            <Form width={width}>
                <FormContent>{children}</FormContent>
                <FormFooter>{footerContent}</FormFooter>
            </Form>
        </Main>
    )
}

const Main = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`

const Title = styled.h1``

const Form = styled.div`
    width: ${({ width }) => width};
`

const FormFooter = styled.div`
    margin-top: 30px;
`

const FormContent = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: stretch;
    align-content: stretch;
`
