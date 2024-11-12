import { useState } from 'react'
import { fetchArtisan } from '@/api/artisan/artisanAPI'


const useArtisan = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchSingleArtisan = async (slug: string) => {
        setError(null)
        setLoading(true)  // Set loading to true before fetching
        try {
            const data = await fetchArtisan(slug)  // Expecting an array of Product
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to fetch product')
        } finally {
            setLoading(false)  // Set loading to false after fetching
        }
    }


    return { error, loading, fetchSingleArtisan }
}

export default useArtisan
