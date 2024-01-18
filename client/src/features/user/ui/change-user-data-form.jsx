import { selectCurrentUser } from 'entities/user'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button, FormLayout, Select, TextField, destinations } from 'shared'
import styled from 'styled-components'
import { useChangeUserData } from '../hooks/use-change-user-data'

export const ChangeUserDataForm = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm()
    const user = useSelector(selectCurrentUser)
    const changeUserDataMutation = useChangeUserData()

    const onSubmit = (data) => {
        changeUserDataMutation.mutate(data)
    }

    useEffect(() => {
        setValue('email', user.email)
        setValue('firstName', user.firstName)
        setValue('lastName', user.lastName)
        setValue('destinationId', user.destinationId)
    }, [setValue, user])

    return (
        <Main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLayout width="100%">
                    <TextField
                        inputProps={{
                            type: 'email',
                            ...register('email', {
                                required: 'Поле должно быть заполнено',
                                minLength: {
                                    value: 3,
                                    message:
                                        'E-mail должен быть более 3 символов',
                                },
                                pattern: {
                                    value: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
                                    message: 'Не валидный адрес E-mail',
                                },
                            }),
                        }}
                        label="E-mail"
                        error={errors.email ? errors.email.message : null}
                    />
                    <TextField
                        inputProps={{
                            type: 'text',
                            ...register('lastName', {
                                required: 'Поле должно быть заполнено',
                                minLength: {
                                    value: 2,
                                    message:
                                        'Фамилия должна быть более 2 символов',
                                },
                            }),
                        }}
                        label="Фамилия"
                        error={errors.lastName ? errors.lastName.message : null}
                    />
                    <TextField
                        inputProps={{
                            type: 'text',
                            ...register('firstName', {
                                required: 'Поле должно быть заполнено',
                                minLength: {
                                    value: 2,
                                    message: 'Имя должна быть более 2 символов',
                                },
                            }),
                        }}
                        label="Имя"
                        error={
                            errors.firstName ? errors.firstName.message : null
                        }
                    />
                    <Select
                        label="Группа операторов"
                        selectProps={{ ...register('destinationId') }}
                        data={destinations}
                    />
                    <Button
                        buttonProps={{
                            type: 'submit',
                            style: { width: '200px' },
                        }}
                        isLoading={changeUserDataMutation.isPending}
                    >
                        Сохранить
                    </Button>
                </FormLayout>
            </form>
        </Main>
    )
}

const Main = styled.div``
