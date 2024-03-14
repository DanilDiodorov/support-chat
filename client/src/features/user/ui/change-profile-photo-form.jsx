import { OperatorPhoto } from 'entities/user'
import { Button, FileButton, imagesTypes } from 'shared'
import styled from 'styled-components'
import { MdDelete } from 'react-icons/md'
import { useChangeProfilePhoto } from '../hooks/use-change-profile-photo'
import { toast } from 'sonner'
import { useDeleteProfilePhoto } from '../hooks/use-delete-profile-photo'

export const ChangeProfilePhotoForm = () => {
    const changeProfilePhotoMutation = useChangeProfilePhoto()
    const deleteUserDataMutation = useDeleteProfilePhoto()

    const onFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            if (imagesTypes.includes(file.type)) {
                const formData = new FormData()
                formData.append('file', file)
                changeProfilePhotoMutation.mutate(formData)
            } else {
                toast.error('Неверный формат файла')
            }
        }
    }

    return (
        <Main>
            <OperatorPhoto size="200px" status="none" />
            <Buttons>
                <FileButton
                    inputProps={{
                        style: { width: '200px' },
                        accept: 'image/jpeg, image/png, image/jpeg',
                        onChange: onFileChange,
                    }}
                >
                    Изменить
                </FileButton>
                <Button
                    color="danger"
                    buttonProps={{
                        style: { width: '40px', fontSize: '20px' },
                        onClick: () => deleteUserDataMutation.mutate(),
                    }}
                >
                    <MdDelete />
                </Button>
            </Buttons>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`

const Buttons = styled.div`
    display: flex;
    gap: 10px;
`
