import { useForm } from 'react-hook-form'
import { Button, FormLayout, Link, TextField } from 'shared'
import { useLogin } from '../hooks/use-login'

const FooterContent = (
    <>
        У вас нет акканутна? <Link to="/registration">Создать акканут</Link>
    </>
)

export const LoginForm = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm()

    const loginMutation = useLogin(setValue)

    const onSubmit = (data) => {
        loginMutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
            <FormLayout title={'Войти в систему'} footerContent={FooterContent}>
                <TextField
                    inputProps={{
                        type: 'email',
                        ...register('email', {
                            required: 'Поле должно быть заполнено',
                        }),
                    }}
                    label="E-mail"
                    error={errors.email ? errors.email.message : null}
                />
                <TextField
                    inputProps={{
                        type: 'password',
                        ...register('password', {
                            required: 'Поле должно быть заполнено',
                        }),
                    }}
                    label="Пароль"
                    error={errors.password ? errors.password.message : null}
                />
                <Button
                    buttonProps={{ type: 'submit' }}
                    isLoading={loginMutation.isPending}
                >
                    Войти
                </Button>
            </FormLayout>
        </form>
    )
}
