<template>
  <div class="image-card-list">
    <ImageCard
      v-for="(image, index) in imageList"
      @click="emit('open-modal', image)"
      :class="`image-${index}`"
      :key="image.id"
      v-bind="image"
      :style="`grid-row-end: span ${image.row_span}`"
    ></ImageCard>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import ImageCard from './ImageCard.vue'
import type { Image } from '@/types'

const emit = defineEmits(['open-modal'])

defineProps<{
  imageList: Image[]
}>()
</script>

<style scoped lang="scss">
.image-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 30px;
  column-gap: 50px;
  padding: 0 40px;
  @include position(relative, -75px);
}
</style>
