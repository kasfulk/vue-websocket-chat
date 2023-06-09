<template>
  <div class="flex flex-wrap w-full h-screen justify-center align-middle">
    <div
      class="flex flex-wrap justify-center items-start content-start w-1/2 min-w-full bg-blue-100 h-full"
    >
      <Header class="sticky top-0" :title="`#${channel}`" />
      <div ref="chatWrapper" class="flex-none p-2 h-[85%] overflow-y-scroll content-end w-full">
        <!-- TODO: Chat List -->
        <ReceiverMessage message="coba dulu dong" sender="mas mas" />
        <SenderMessage message="coba dulu dong" sender="bamabng" />
      </div>
    </div>
    <div class="fixed w-full px-2 flex bottom-2">
      <input
        v-model="groupNameAdd"
        class="shadow appearance-none border rounded w-full py-2 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="group name"
        type="text"
        placeholder="Message"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="handleClick"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { socket, state } from '@/libraries/socket'
import Header from '@/components/Header.vue'
import ReceiverMessage from '@/components/ReceiverMessage.vue'
import SenderMessage from '@/components/SenderMessage.vue'

const route = useRoute()
const channel = ref('')
const chatWrapper = ref(null)

const chatToBottom = () => {
  chatWrapper.value.scrollTop = chatWrapper.value.scrollHeight
}

onMounted(async () => {
  channel.value = route.params.channel
  chatToBottom()
  await socket.connect()
  console.log(state)
})
</script>
