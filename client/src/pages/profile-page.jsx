import {
    ChangePasswordForm,
    ChangeProfilePhotoForm,
    ChangeUserDataForm,
} from 'features/user'
import styled from 'styled-components'

const ProfilePage = () => {
    return (
        <Main>
            <Content>
                <ChangeProfilePhotoForm />
                <ChangeUserDataForm />
                <ChangePasswordForm />
            </Content>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    justify-content: center;
    overflow-y: auto;
`

const Content = styled.div`
    margin-top: 100px;
    width: 40%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 50px;
`

export default ProfilePage
