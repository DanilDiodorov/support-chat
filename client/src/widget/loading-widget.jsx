import { BallTriangle } from 'react-loader-spinner'
import styled from 'styled-components'

const LoadingWidget = () => {
    return (
        <Main>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="grey"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export default LoadingWidget
