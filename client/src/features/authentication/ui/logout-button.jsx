import { BiLogOut } from 'react-icons/bi'
import { useLogout } from '../hooks/use-logout'
import styled from 'styled-components'

export const LogoutButton = () => {
    const logoutMutation = useLogout()

    return (
        <Main
            onClick={() => {
                logoutMutation.mutate()
            }}
        />
    )
}

const Main = styled(BiLogOut)`
    &:hover {
        cursor: pointer;
    }
`
