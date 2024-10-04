import axios from 'axios'

const { VITE_UNSPLASH_API_URL, VITE_UNSPLASH_ACCESS_KEY } = import.meta.env
const useImage = () => {
  const fetchImages = async (query = 'African') => {
    const result = await axios.get(
      `${VITE_UNSPLASH_API_URL}/photos/random?client_id=${VITE_UNSPLASH_ACCESS_KEY}&count=8&query=${query}`
    )

    return result.data.map((image: any) => ({
      id: image.id,
      image_preview_url: image.urls.small_s3,
      image_regular_url: image.urls.regular,
      alt_description: image.alt_description,
      artist: image.user.name,
      photo_location: image.user.location ?? 'Lagos, Nigeria'
    }))
  }

  return {
    fetchImages
  }
}

export default useImage
