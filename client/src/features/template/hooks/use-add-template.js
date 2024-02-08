import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTemplateApi } from '../api/add-template-api'
import { toast } from 'sonner'

export const useAddTemplate = () => {
    const queryClient = useQueryClient()

    const addTemplateMutation = useMutation({
        mutationFn: addTemplateApi,
        onSuccess: () => {
            toast.success('Успешо добавлено!')
            queryClient.invalidateQueries(['templates'])
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return addTemplateMutation
}
