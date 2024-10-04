<template>
  <div class="search-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a photo"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim() === '') return
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
.search-container {
  @include flex-container(row, start, center);
  padding: 10px 30px;
  border-radius: $base-radius;
  width: 700px;
  height: 60px;
  background-color: #fff;

  svg {
    height: 20px;
    width: 20px;
  }

  input {
    outline: none;
    background: transparent;
    border: none;
    width: 100%;
    height: 100%;
    padding: 5px 15px;
  }
}
</style>
