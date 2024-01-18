import { selectCurrentUser } from 'entities/user'
import { useRefresh } from 'features/authentication'
import { useSocket } from 'features/socket'
import { useSelector } from 'react-redux'
import LoadingWidget from 'widget/loading-widget'
import MainPage from './main-page'
import ChatPage from './chat-page'
import ChatContentPage from './chat-content-page'
import LoginPage from './login-page'
import RegistrationPage from './registration-page'
import ProfilePage from './profile-page'
import { Navigate, Route, Routes } from 'react-router-dom'

const Routing = () => {
    const isLoading = useRefresh()
    const user = useSelector(selectCurrentUser)
    useSocket()

    if (isLoading) return <LoadingWidget />
    else {
        return (
            <>
                {user ? (
                    <Routes>
                        <Route element={<MainPage />}>
                            <Route path="/" element={<ChatPage />}>
                                <Route
                                    path="/chats/:chatId"
                                    element={<ChatContentPage />}
                                />
                            </Route>
                            <Route path="/profile" element={<ProfilePage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/registration"
                            element={<RegistrationPage />}
                        />
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </Routes>
                )}
            </>
        )
    }
}

export default Routing
