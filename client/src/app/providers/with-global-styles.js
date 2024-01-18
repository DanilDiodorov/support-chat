import { GlobalStyles } from 'shared'

const withGlobalStyles = (component) => () => {
    return (
        <>
            {component()}
            <GlobalStyles />
        </>
    )
}

export default withGlobalStyles
