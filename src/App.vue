<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheSearchBar from '@/components/TheSearchBar.vue'
import AppModal from '@/components/AppModal.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import useImage from '@/composables/useImage'
import ImageGrid from '@/components/ImageGrid.vue'
import CloseCircle from '@/components/icons/CloseCircle.vue'
import type { Image } from './types'

const { fetchImages } = useImage()
const imageList = ref<Image[]>([])

const isModalOpen = ref(false)
const modalData = ref<Image>()

const openModal = (data: Image) => {
  modalData.value = data
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const isSearching = ref(false)
const searchQuery = ref('')
const isSearchBarVisible = ref(true)

const loadImages = async (query?: string) => {
  if (query) {
    searchQuery.value = query
    isSearchBarVisible.value = false
  }

  isSearching.value = true

  try {
    imageList.value = []
    imageList.value = await fetchImages(query)
  } catch (error) {
    console.error(error)
  } finally {
    isSearching.value = false
  }
}

const closeSearch = async () => {
  isSearchBarVisible.value = true
  searchQuery.value = ''
  await loadImages()
}

onMounted(async () => {
  await loadImages()
})
</script>

<template>
  <header>
    <div class="header-container">
      <div class="search-texts-container">
        <p v-if="isSearching && searchQuery">
          Searching for <span>"{{ `${searchQuery}` }}"</span>
        </p>
        <p v-else-if="!isSearching && searchQuery">
          Search Results for <span>"{{ `${searchQuery}` }}"</span>
        </p>
        <div
          v-if="!isSearchBarVisible && !isSearching"
          @click="closeSearch"
          style="display: inline-block; color: #0a2e65; width: 20px; height: 20px; cursor: pointer"
        >
          <CloseCircle />
        </div>
      </div>
      <div class="search-bar-container">
        <TheSearchBar v-if="isSearchBarVisible" @search="loadImages($event)" />
      </div>
    </div>
  </header>

  <main>
    <SkeletonLoader v-if="isSearching" />
    <div v-if="!isSearching && !imageList.length" class="empty-state">
      <p>No images found. Please try a different search.</p>
    </div>
    <ImageGrid
      v-if="imageList.length && !isSearching"
      :image-list="imageList"
      @open-modal="openModal($event)"
    />
  </main>

  <AppModal :isOpen="isModalOpen" @close="closeModal">
    <div class="modal-content">
      <img :src="modalData?.image_regular_url" />
      <div class="modal-content__details">
        <h2>{{ modalData?.artist }}</h2>
        <p>{{ modalData?.photo_location }}</p>
      </div>
    </div>
  </AppModal>
</template>

<style scoped lang="scss">
header {
  height: 300px;
  width: 100%;
  padding: 20px;
  background-color: $header-bg;
  .header-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 70px;
  }

  .search-texts-container {
    height: 100%;
    @include flex-container(row, start, baseline);

    p {
      font-size: 38px;
      font-weight: bold;
      color: $dark-blue;
      margin-bottom: 30px;
      text-align: left;
      padding-left: 20px;
      span {
        color: $gray-blue;
      }
    }
  }

  .search-bar-container {
    width: 100%;
    margin: 0 auto;
    @include flex-container();
  }
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px;
  .empty-state {
    font-size: 24px;
    color: $dark-blue;
    text-align: center;
    margin: 40px 0;
    font-weight: 600;
  }
}

.modal-content {
  height: 100%;
  &__details {
    padding: 20px 50px;
    h2 {
      font-weight: 800;
    }
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: $base-radius $base-radius 0 0;
  }
}
</style>
