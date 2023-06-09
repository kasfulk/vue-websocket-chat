<template>
  <div class="w-full h-full flex justify-center align-middle">
    <form class="w-1/2 bg-white px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
        <input
          v-model="username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="handleClick"
        >
          Set Username
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const router = useRouter()

onMounted(() => {
  const usernameLs = localStorage.getItem('username')
  if (usernameLs) {
    router.push('/group')
  }
})

const handleClick = () => {
  localStorage.setItem('username', username.value)
  router.push('/group')
}
</script>
