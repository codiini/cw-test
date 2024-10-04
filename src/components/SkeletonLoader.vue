<template>
  <div class="skeleton-grid">
    <div
      v-for="i in 8"
      :key="i"
      :class="`skeleton-item item-${i}`"
      :style="`grid-row-end: span ${rowSize()}`"
    >
      <div class="skeleton-image"></div>
      <div class="skeleton-text">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 30px;
  column-gap: 50px;
  @include position(relative, -75px);
  padding: 0 40px;
}

.skeleton-item {
  @include flex-container(column, auto, auto);
  min-height: 500px;
  height: 100%;
  width: 100%;
  min-width: 300px;
  border-radius: $base-radius;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.skeleton-image {
  min-height: 250px;
  height: 80%;
  background-color: #f5f5f5;
}

.skeleton-text {
  padding: 20px;
  margin-top: auto;
}

.skeleton-line {
  height: 15px;
  margin-bottom: 10px;
}

.skeleton-line.short {
  width: 60%;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-info {
  padding: 10px;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.skeleton-line {
  background-image: linear-gradient(to right, #e0e0e0 0%, #d0d0d0 20%, #e0e0e0 40%, #e0e0e0 100%);
  background-size: 800px 104px;
  animation: shimmer 1.5s infinite linear;
}
</style>

<script setup lang="ts">
const rowSize = () => {
  return Math.ceil(Math.random() * 3) + 3
}
</script>
