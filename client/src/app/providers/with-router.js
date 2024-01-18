import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

const withRouter = (component) => () => {
    return (
        <BrowserRouter>
            <Suspense fallback="loading...">{component()}</Suspense>
        </BrowserRouter>
    )
}

export default withRouter
