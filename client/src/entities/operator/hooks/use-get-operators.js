import { useQuery } from '@tanstack/react-query'
import { getOperators } from '../api/get-operators'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'entities/user'

export const useGetOperators = () => {
    const user = useSelector(selectCurrentUser)
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['operator'],
        queryFn: () => getOperators(user.destinationId),
    })

    return { data, isLoading, isError, error }
}
