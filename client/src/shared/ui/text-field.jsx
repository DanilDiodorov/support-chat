import styled from 'styled-components'

export const TextField = ({ inputProps, label, error }) => {
    return (
        <Main>
            <Label>{label}</Label>
            <Input error={error} {...inputProps} />
            <ErrorLabel>{error && error}</ErrorLabel>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const Label = styled.div``

const ErrorLabel = styled.div`
    height: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.danger};
`

const Input = styled.input`
    padding-left: 10px;
    height: 40px;
    border: 1px solid
        ${({ theme, error }) =>
            !error ? theme.colors.grey : theme.colors.danger};
    font-size: 18px;
    outline: none;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
`
