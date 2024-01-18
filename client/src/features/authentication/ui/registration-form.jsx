import { useForm } from 'react-hook-form'
import {
    Button,
    FormLayout,
    Link,
    Select,
    TextField,
    destinations,
} from 'shared'
import { useRegistration } from '../hooks/use-registration'

const FooterContent = (
    <>
        Уже есть акканут? <Link to="/login">Войти</Link>
    </>
)

export const RegistrationForm = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        setError,
    } = useForm()
    const registrationMutation = useRegistration()

    const onSubmit = (data) => {
        console.log(data)
        if (data.password !== data.password_2) {
            setError('password_2', {
                type: 'password_error',
                message: 'Пароли не совпадают',
            })
        } else {
            registrationMutation.mutate(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
            <FormLayout title={'Создать аккаунт'} footerContent={FooterContent}>
                <TextField
                    inputProps={{
                        type: 'email',
                        ...register('email', {
                            required: 'Поле должно быть заполнено',
                            minLength: {
                                value: 3,
                                message: 'E-mail должен быть более 3 символов',
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
                                message: 'Фамилия должна быть более 2 символов',
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
                    error={errors.firstName ? errors.firstName.message : null}
                />
                <TextField
                    inputProps={{
                        type: 'password',
                        ...register('password', {
                            required: 'Поле должно быть заполнено',
                            minLength: {
                                value: 6,
                                message: 'Пароль должен быть более 6 символов',
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
                    error={errors.password_2 ? errors.password_2.message : null}
                />
                <Select
                    label="Группа операторов"
                    selectProps={{ ...register('destinationId') }}
                    data={destinations}
                />
                <Button
                    isLoading={registrationMutation.isPending}
                    buttonProps={{ type: 'submit' }}
                >
                    Создать акканут
                </Button>
            </FormLayout>
        </form>
    )
}
