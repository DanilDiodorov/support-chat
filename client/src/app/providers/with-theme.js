import { lightTheme } from 'shared'
import { ThemeProvider } from 'styled-components'

const withTheme = (component) => () => {
    return <ThemeProvider theme={lightTheme}>{component()}</ThemeProvider>
}

export default withTheme
