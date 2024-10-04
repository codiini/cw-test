<template>
  <Teleport to="body">
    <transition name="fade" mode="out-in">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <XMark />
          </button>
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import XMark from './icons/XMark.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-overlay {
  @include position(fixed, 0, auto, auto, 0);
  @include flex-container();
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  padding: 40px;
}

.modal-content {
  background-color: white;
  border-radius: $base-radius;
  max-width: 900px;
  width: 100%;
  max-height: 90%;
  @include position(relative);

  .modal-close {
    @include position(absolute, -5%, -40px);
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }
  }
}
</style>
