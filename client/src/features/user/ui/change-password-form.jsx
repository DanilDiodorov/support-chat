import { useForm } from 'react-hook-form'
import { Button, FormLayout, TextField } from 'shared'
import styled from 'styled-components'
import { useChangePassword } from '../hooks/use-change-password'

export const ChangePasswordForm = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        setError,
        setValue,
    } = useForm()
    const changePasswordMutation = useChangePassword(setValue)

    const onSubmit = (data) => {
        if (data.password !== data.password_2) {
            setError('password_2', {
                type: 'password_error',
                message: 'Пароли не совпадают',
            })
        } else {
            changePasswordMutation.mutate({ password: data.password })
        }
    }

    return (
        <Main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormLayout width="100%">
                    <TextField
                        inputProps={{
                            type: 'password',
                            ...register('password', {
                                required: 'Поле должно быть заполнено',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Пароль должен быть более 6 символов',
                                },
                                maxLength: {
                                    value: 30,
                                    message:
                                        'Пароль должен быть не более 30 символов',
                                },
                            }),
                        }}
                        label="Пароль"
                        error={errors.password ? errors.password.message : null}
                    />
                    <TextField
                        inputProps={{
                            type: 'password',
                            ...register('password_2', {
                                required: 'Поле должно быть заполнено',
                            }),
                        }}
                        label="Повторный пароль"
                        error={
                            errors.password_2 ? errors.password_2.message : null
                        }
                    />
                    <Button
                        buttonProps={{
                            type: 'submit',
                            style: { width: '200px' },
                        }}
                        isLoading={changePasswordMutation.isPending}
                    >
                        Сохранить
                    </Button>
                </FormLayout>
            </form>
        </Main>
    )
}

const Main = styled.div``
