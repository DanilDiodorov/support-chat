import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { udpateTemplateApi } from '../api/udpate-template-api'

export const useUpdateTemplate = () => {
    const queryClient = useQueryClient()

    const updateTemplateMutation = useMutation({
        mutationFn: udpateTemplateApi,
        onSuccess: () => {
            toast.success('Успешо обновлено!')
            queryClient.invalidateQueries(['templates'])
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        },
    })

    return updateTemplateMutation
}
