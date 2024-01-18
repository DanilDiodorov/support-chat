import styled from 'styled-components'

export const Select = ({ label, data, selectProps, error }) => {
    return (
        <Main>
            <Label>{label}</Label>
            <MainSelect {...selectProps}>
                {data.map((el, index) => (
                    <Option key={index} value={el.value}>
                        {el.text}
                    </Option>
                ))}
            </MainSelect>
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

const MainSelect = styled.select`
    height: 40px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.grey};
    outline: none;
    padding-left: 5px;
    font-size: 18px;
`

const Option = styled.option``
