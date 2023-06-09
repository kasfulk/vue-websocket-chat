<template>
  <div class="flex flex-wrap w-full h-screen justify-center align-middle">
    <div
      class="flex flex-wrap justify-center items-start content-start w-1/2 min-w-full bg-blue-100 h-full"
    >
      <Header class="sticky top-0" :title="`#${channel}`" />
      <div ref="chatWrapper" class="flex-none p-2 h-[85%] overflow-y-scroll content-end w-full">
        <div v-for="(value, index) in chatList" :key="index">
          <ReceiverMessage
            v-if="value.sender !== username"
            :message="value.message"
            :sender="value.sender"
          />
          <SenderMessage v-else :message="value.message" :sender="value.sender" />
        </div>
      </div>
    </div>
    <div class="fixed w-full px-2 flex bottom-2">
      <input
        v-model="message"
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
import { v4 as uuidv4 } from 'uuid'
import { socket } from '@/libraries/socket'
import { storeChat, getChat, storeInit } from '@/stores/chat'
import Header from '@/components/Header.vue'
import ReceiverMessage from '@/components/ReceiverMessage.vue'
import SenderMessage from '@/components/SenderMessage.vue'

const route = useRoute()
const channel = ref('')
const message = ref('')
const chatWrapper = ref(null)
const chatList = ref([])
const username = localStorage.getItem('username')

const chatToBottom = () => {
  chatWrapper.value.scrollTop = chatWrapper.value.scrollHeight
}

const listener = (...args) => {
  const response = JSON.parse(args[0])
  chatList.value.push(response)
  storeChat(channel.value, JSON.stringify(chatList.value))
  chatToBottom()
}

onMounted(() => {
  channel.value = route.params.channel
  storeInit(channel.value)
  chatList.value = getChat(channel.value)
  chatToBottom()
  socket.connect()
  socket.on('connect', () => {
    console.log(socket.id + ' is connected!')
  })

  socket.on('chatResponse-' + channel.value, listener)
})

const handleClick = () => {
  const messageRequest = {
    id: uuidv4(),
    sender: username,
    message: message.value
  }
  socket.emit('chat', channel.value, messageRequest)
  chatList.value.push(messageRequest)
  message.value = ''
  storeChat(channel.value, JSON.stringify(chatList.value))
  chatToBottom()
}
</script>
