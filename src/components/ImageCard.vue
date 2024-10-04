<template>
  <div class="image-card">
    <img :src="image_preview_url" :alt="alt_description" />
    <div class="overlay"></div>
    <div class="image-card__photo-details">
      <h3>{{ artist }}</h3>
      <p>{{ photo_location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Image } from '../types'

type ImageProps = Omit<Image, 'image_regular_url'>

defineProps<ImageProps>()
</script>

<style lang="scss" scoped>
.image-card {
  position: relative;
  border-radius: $base-radius;
  overflow: hidden;
  cursor: pointer;
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
}
</style>
