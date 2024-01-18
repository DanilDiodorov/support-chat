import { Toaster } from 'sonner'

const withToaster = (component) => () => {
    return (
        <>
            {component()}
            <Toaster richColors position="top-right" />
        </>
    )
}

export default withToaster
