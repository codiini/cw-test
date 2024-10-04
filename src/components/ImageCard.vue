<template>
  <div class="image-card">
    <div v-if="!imageLoaded" class="blurhash-container" ref="blurhashContainer">
      <canvas ref="canvas"></canvas>
    </div>
    <img
      :src="image_regular_url"
      :alt="alt_description"
      @load="onImageLoad"
      :style="{ display: imageLoaded ? 'block' : 'none' }"
    />
    <div class="overlay"></div>
    <div class="image-card__photo-details">
      <h3>{{ artist }}</h3>
      <p>{{ photo_location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { decode } from 'blurhash'
import type { Image } from '../types'

type ImageProps = Omit<Image, 'image_regular_url | row_span'>

const props = defineProps<ImageProps>()

const imageLoaded = ref(false)
const canvas = ref<HTMLCanvasElement | null>(null)

const onImageLoad = () => {
  imageLoaded.value = true
}

const blurhashContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (canvas.value && blurhashContainer.value) {
    const containerWidth = blurhashContainer.value.offsetWidth
    const containerHeight = blurhashContainer.value.offsetHeight

    canvas.value.width = containerWidth
    canvas.value.height = containerHeight

    const pixels = decode(props.blur_hash, containerWidth, containerHeight)
    const ctx = canvas.value.getContext('2d')
    const imageData = ctx!.createImageData(containerWidth, containerHeight)
    imageData.data.set(pixels)
    ctx!.putImageData(imageData, 0, 0)
  }
})
</script>

<style lang="scss" scoped>
.image-card {
  position: relative;
  border-radius: $base-radius;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  min-width: 300px;
  min-height: 500px;
  height: 100%;
  &:hover {
    img {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__photo-details {
    @include position(absolute, auto, 0, 20px, 0);
    padding: 10px 20px;
    color: white;

    h3 {
      margin: 0;
      font-size: 20px;
    }

    p {
      margin: 5px 0 0;
      font-size: 14px;
      text-transform: capitalize;
    }
  }
  .overlay {
    @include position(absolute, 50%, 0, 0, 0);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  }

  .blurhash-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 300px;
    height: 100%;
    overflow: hidden;

    canvas {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
}
</style>
