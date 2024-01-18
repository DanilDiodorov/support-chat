import { Button } from 'shared'
import styled from 'styled-components'

export const PopupLayout = ({
    title,
    onConfirm,
    onCancel,
    children,
    active,
    setActive,
    disabled,
    isLoading,
}) => {
    return (
        <Main
            active={active}
            onClick={() => {
                setActive(false)
            }}
        >
            <Popup onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Container>{title}</Container>
                </Header>
                <Content>
                    <Container>{children}</Container>
                </Content>
                <Footer>
                    <Container>
                        <Buttons>
                            <Button
                                varient="text"
                                buttonProps={{
                                    onClick: () => setActive(false),
                                }}
                                isLoading={isLoading}
                            >
                                Отмена
                            </Button>
                            <Button
                                buttonProps={{
                                    style: { padding: '0 40px' },
                                    onClick: onConfirm,
                                }}
                                disabled={disabled}
                                isLoading={isLoading}
                            >
                                Ок
                            </Button>
                        </Buttons>
                    </Container>
                </Footer>
            </Popup>
        </Main>
    )
}

const Main = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: ${({ active }) => (active ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
`
const Popup = styled.div`
    width: 800px;
    background-color: white;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
`
const Container = styled.div`
    padding: 20px;
`

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`

const Header = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    font-weight: bold;
`
const Content = styled.div``

const Footer = styled.div``
