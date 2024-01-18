import styled from 'styled-components'

export const FileButton = ({
    children,
    isLoading,
    disabled,
    color,
    inputProps,
}) => {
    return (
        <>
            <Main {...inputProps} type="file" id="file" />
            <Label
                {...inputProps}
                isLoading={isLoading}
                disabled={disabled}
                color={color}
                for="file"
            >
                {children}
            </Label>
        </>
    )
}

const Main = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`

const Label = styled.label`
    font-size: 14px;
    height: 40px;
    border: none;
    color: white;
    background-color: ${({ theme, isLoading, disabled, color }) =>
        isLoading || disabled
            ? theme.colors.grey
            : color === 'danger'
            ? theme.colors.danger
            : theme.colors.secondary};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: ${({ isLoading, disabled }) =>
        isLoading || disabled ? 'none' : 'all'};

    &:hover {
        cursor: pointer;
        background-color: ${({ theme, isLoading, color }) =>
            isLoading
                ? theme.colors.grey
                : color === 'danger'
                ? theme.colors.danger
                : theme.colors.secondaryDark};
    }
`
