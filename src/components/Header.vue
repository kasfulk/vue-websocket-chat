<template>
  <div
    class="w-full flex justify-between shadow-md py-5 px-2 text-gray-800 font-bold z-50 bg-white"
  >
    <h1 class="text-blue-400 text-sm cursor-pointer" @click="back">&lt; Back</h1>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: String
})

const back = () => {
  router.go(-1)
}
</script>
