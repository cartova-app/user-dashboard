import { useQuery } from '@tanstack/react-query'
import { getAllStoresFn } from '../../services/store'

const useGetAllStores = () => {
    return (
        useQuery({
            queryKey: ["stores"],
            queryFn: () => getAllStoresFn(),
        })
    )
}

export default useGetAllStores