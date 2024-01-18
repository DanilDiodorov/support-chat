import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

export const Link = styled(RouterLink)`
    color: ${({ theme, none }) =>
        none ? theme.colors.text : theme.colors.secondary};
    text-decoration: none;
`
