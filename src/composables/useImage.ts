import axios from 'axios'
import { decode } from 'blurhash'

const { VITE_UNSPLASH_API_URL, VITE_UNSPLASH_ACCESS_KEY } = import.meta.env
const useImage = () => {
  const fetchImages = async (query = 'African') => {
    const result = await axios.get(
      `${VITE_UNSPLASH_API_URL}/photos/random?client_id=${VITE_UNSPLASH_ACCESS_KEY}&count=8&query=${query}`
    )

    return result.data.map((image: any) => ({
      id: image.id,
      image_preview_url: image.urls.small,
      image_regular_url: image.urls.regular,
      alt_description: image.alt_description,
      artist: image.user.name,
      photo_location: image.user.location ?? 'N/A',
      row_span: Math.ceil(Math.random() * 3) + 3,
      blur_hash: image.blur_hash
    }))
  }

  const setBlurHash = (canvas: HTMLCanvasElement, hash: string, hashContainer: HTMLDivElement) => {
    const containerWidth = hashContainer.offsetWidth
    const containerHeight = hashContainer.offsetHeight

    canvas.width = containerWidth
    canvas.height = containerHeight

    const pixels = decode(hash ?? 'LnL;NtIW.8ad_NWBRjofgOt6IUa$', containerWidth, containerHeight)
    const ctx = canvas.getContext('2d')
    const imageData = ctx.createImageData(containerWidth, containerHeight)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }

  return {
    fetchImages,
    setBlurHash
  }
}

export default useImage
