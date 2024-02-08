import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTemplateApi } from '../api/delete-template-api'
import { toast } from 'sonner'

export const useDeleteTemplate = () => {
    const queryClient = useQueryClient()

    const deleteTemplateMutation = useMutation({
        mutationFn: deleteTemplateApi,
        onSuccess: () => {
            toast.success('Успешо удалено!')
            queryClient.invalidateQueries(['templates'])
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return deleteTemplateMutation
}
