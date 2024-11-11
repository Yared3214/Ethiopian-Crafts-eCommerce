import { useDispatch } from 'react-redux'
import { Product } from '@/types/product'
import { useState } from 'react'
import { fetchProducts } from '@/api/product/productAPI'
import { setProducts } from '@/store/feature/product/productSlice'

const useProduct = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchProductsHandler = async () => {
        setError(null)
        setLoading(true)  // Set loading to true before fetching
        try {
            const data = await fetchProducts()  // Expecting an array of Product
            dispatch(setProducts(data))  // Dispatching the array to setProducts
            return data
        } catch (error) {
            setError((error as any).message || 'Failed to fetch products')
        } finally {
            setLoading(false)  // Set loading to false after fetching
        }
    }

    return { error, loading, fetchProductsHandler }
}

export default useProduct
