import { useState } from 'react'
import { createArtisans, fetchArtisan, fetchArtisans, toggleActivateUser, updateArtisanBySlug } from '@/api/artisan/artisanAPI'
import { useDispatch } from 'react-redux'
import { setArtisans, updateArtisan } from '@/store/feature/artisan/artisanSlice'
import { Artisan, ArtisanResponse } from '@/types/artisan'


const useArtisan = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch();

    const createArtisanHandler = async (ArtisanData: Artisan) => {
        setError(null)
        setLoading(true)
        try {
            const data = await createArtisans(ArtisanData);
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to create artisan')
        } finally {
            setLoading(false)  // Set loading to false after fetching
        }
    }

    const fetchSingleArtisan = async (slug: string) => {
        setError(null)
        setLoading(true)  // Set loading to true before fetching
        try {
            const data = await fetchArtisan(slug)  // Expecting an array of Product
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to fetch artisan')
        } finally {
            setLoading(false)  // Set loading to false after fetching
        }
    }

    const fetchAllArtisans = async() => {
        setError(null)
        setLoading(true);
        try {
            const data = await fetchArtisans();
            console.log(data);
            dispatch(setArtisans(data));
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to fetch artisans')
        } finally {
            setLoading(false)  // Set loading to false after fetching
        }
    };

    const toggleActivateArtisanHandler = async(userId: string) => {
            setError(null)
            setLoading(true)
            try {
                const data = await toggleActivateUser(userId);
                console.log("user activated or deactivated: ", data.artisan);
                dispatch(updateArtisan(data.artisan));
            } catch (error) {
                setError((error as any).message || 'Failed to activate or deactivate artisan')
             } finally {
                setLoading(false);
             }
        }

    const updateArtisanHandler = async(slug: string, artisanData: Partial<Artisan> | FormData) => {
        setError(null)
        setLoading(true)
        try {
            const data = await updateArtisanBySlug(slug, artisanData);
            console.log('updated artisan', data.updatedArtisan);
            dispatch(updateArtisan(data.updatedArtisan));
            return data;
        } catch (error) {
            setError((error as any).message || 'Failed to update artisan')
            } finally {
            setLoading(false);
            }
    }

    return { error, loading, fetchSingleArtisan, fetchAllArtisans, createArtisanHandler, toggleActivateArtisanHandler, updateArtisanHandler }
}

export default useArtisan
