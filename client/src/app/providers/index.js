import compose from 'compose-function'
import withRouter from './with-router'
import withGlobalStyles from './with-global-styles'
import withTheme from './with-theme'
import withRedux from './with-redux'
import withQuery from './with-query'
import withToaster from './with-toaster'

const withProviders = compose(
    withRedux,
    withRouter,
    withTheme,
    withGlobalStyles,
    withQuery,
    withToaster
)

export default withProviders
