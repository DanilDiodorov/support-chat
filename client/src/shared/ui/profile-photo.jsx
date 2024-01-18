import { convertToCSSColor } from 'shared/utils/convert-to-css-color'
import styled from 'styled-components'

export const ProfilePhoto = ({ name, size, status, style, url = '' }) => {
    return (
        <Main
            style={style}
            color={convertToCSSColor(name?.split(' ')[0])}
            size={size}
        >
            {url ? (
                <Image src={url} />
            ) : (
                name?.split(' ')[0][0] + name?.split(' ')[1][0]
            )}
            {status !== 'none' && <Online status={status} />}
        </Main>
    )
}

const Main = styled.div`
    background-color: ${({ color }) => color};
    border-radius: 50%;
    width: ${({ size }) => size} !important;
    height: ${({ size }) => size} !important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: relative;
    font-size: ${({ size }) => parseInt(size) / 3.5}px;
`

const Online = styled.div`
    position: absolute;
    background-color: ${({ theme, status }) =>
        status === 'online' ? 'green' : theme.colors.danger};
    border: 2px solid white;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    bottom: 0;
    right: 0;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`
