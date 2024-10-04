<template>
  <div class="skeleton-grid">
    <div v-for="i in 9" :key="i" :class="`skeleton-item item-${i}`">
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
  place-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 60px;
  position: relative;
  top: -75px;
}

.skeleton-item {
  @include flex-container(column, auto, auto);
  height: 100%;
  width: 360px;
  border-radius: $base-radius;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skeleton-image {
  min-height: 250px;
  height: 80%;
  background-color: #e0e0e0;
}

.skeleton-text {
  padding: 10px;
  margin-top: auto;
}

.skeleton-line {
  height: 20px;
  background-color: #e0e0e0;
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

.skeleton-image,
.skeleton-line {
  background-image: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%);
  background-size: 800px 104px;
  animation: shimmer 1.5s infinite linear;
}

@each $item, $row in $grid-rows {
  .item-#{$item} {
    @include grid-row(nth($row, 1), nth($row, 2));
  }
}
</style>
