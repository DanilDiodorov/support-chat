import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'

export const Button = ({
    children,
    buttonProps,
    isLoading,
    varient,
    disabled,
    color = 'default',
}) => {
    if (varient === 'text') {
        return (
            <Text {...buttonProps} isLoading={isLoading} disabled={disabled}>
                {isLoading ? (
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                ) : (
                    children
                )}
            </Text>
        )
    } else {
        return (
            <Contained
                {...buttonProps}
                isLoading={isLoading}
                disabled={disabled}
                color={color}
            >
                {isLoading ? (
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                ) : (
                    children
                )}
            </Contained>
        )
    }
}

const Contained = styled.button`
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

const Text = styled.button`
    height: 40px;
    border: none;
    color: ${({ theme, isLoading, disabled }) =>
        isLoading || disabled ? theme.colors.grey : theme.colors.secondary};
    background-color: transparent;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: ${({ isLoading, disabled }) =>
        isLoading || disabled ? 'none' : 'all'};

    &:hover {
        cursor: pointer;
    }
`
