<template>
  <div class="w-full h-screen flex justify-center align-middle">
    <div
      class="relative flex flex-wrap justify-center items-start content-start w-full bg-blue-100 h-full"
    >
      <Header title="Group List" />
      <div class="h-max py-2 w-full">
        <ul class="list-none w-full">
          <li
            v-for="(value, index) in groupList"
            :key="index"
            class="py-2 px-2 hover:bg-blue-200 cursor-pointer my-1"
            @click="toGroup(value)"
          >
            #{{ value }}
          </li>
        </ul>
      </div>
      <div class="fixed w-full px-2 flex bottom-2">
        <input
          v-model="groupNameAdd"
          class="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="group name"
          type="text"
          placeholder="group name"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="handleClick"
        >
          Add Group
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const groupNameAdd = ref('')
const groupList = ref([])

onMounted(() => {
  const groupListLS = localStorage.getItem('groupList')
  const username = localStorage.getItem('username')
  if (groupListLS) {
    groupList.value = JSON.parse(groupListLS)
  }
  if (!username) {
    router.push('/')
  }
})

const handleClick = () => {
  groupList.value.push(groupNameAdd.value)
  localStorage.setItem('groupList', JSON.stringify(groupList.value))
  groupNameAdd.value = ''
}

const toGroup = (group) => {
  router.push('/group/' + group)
}
</script>
