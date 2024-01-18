import { Provider } from 'react-redux'
import store from '../store'

const withRedux = (component) => () => {
    return <Provider store={store}>{component()}</Provider>
}

export default withRedux
