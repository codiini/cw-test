<template>
  <div class="image-card-list">
    <ImageCard
      v-for="(image, index) in imageList"
      @click="emit('open-modal', image)"
      :class="`image-${index}`"
      :key="image.id"
      v-bind="image"
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
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 60px;
  @include position(relative, -75px);
}

@each $item, $row in $grid-rows {
  .image-#{$item} {
    @include grid-row(nth($row, 1), nth($row, 2));
  }
}
</style>
