import { useQuery } from '@tanstack/react-query'
import { getTemplatesApi } from '../api/get-temlates-api'

export const useGetTemplates = () => {
    const { data } = useQuery({
        queryKey: ['templates'],
        queryFn: () => getTemplatesApi(),
    })

    return { data }
}
