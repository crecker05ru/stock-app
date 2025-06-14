<template>
  <section class="chat">
    <audio id="onEnter" ref="onEnterElement">
      <source src="/sounds/on_enter_sound.wav" />
    </audio>
    <audio id="popUp" ref="popUpElement">
      <source src="/sounds/pop_sound.mp3" />
    </audio>
    <transition mode="out-in">
      <arrowDown class="chat__window-arrow" @click="showChat" v-if="isChatOpened" />
      <arrowUp class="chat__window-arrow" @click="showChat" v-else />
    </transition>
    <div class="chat__window" v-if="isChatOpened">
      <ul class="chat__window__list">
        <li class="chat__message" v-for="(message, index) in messages" :key="index">
          <span class="chat__message-username" v-if="message.event === 'message'"
            >{{ message.username }}:&nbsp;</span
          >
          <span class="chat__message-text">{{ message.message }}</span>
        </li>
      </ul>
    </div>
    <input
      class="chat__input"
      v-model="username"
      placeholder="Enter nickname"
      v-if="!isUserConnected"
      @keypress="onNicknameEnter"
    />
    <input
      class="chat__input"
      v-model="messageInput"
      placeholder="Enter text"
      v-else
      @keypress="onInputEnter"
    />
  </section>
</template>
<script setup>
import { ref } from 'vue'
import closeIcon from '@/assets/svg/close.svg'
import arrowUp from '@/assets/svg/arrowUp.svg'
import arrowDown from '@/assets/svg/arrowDown.svg'
const emit = defineEmits(['close'])
const messages = ref([])
const messageInput = ref('')
const isUserConnected = ref(false)
const username = ref('')
const isChatOpened = ref(false)
const socket = ref()
const popUpElement = ref()
const onEnterElement = ref()
const baseWS = 'localhost:5180'
// const enterAudio = new Audio("/assets/sounds/on-enter-sound.wav");
// const popAudio = new Audio("/assets/sounds/pop-sound.wav");

function isOpen(ws) {
  return ws.readyState === ws.OPEN
}

const connect = () => {
  socket.value = new WebSocket(`${baseWS}`)
  console.log('isOpen(socket.value)', isOpen(socket.value))
  socket.value.onopen = (e) => {
    isUserConnected.value = true
    console.log('socket e', e)
    const message = {
      event: 'connection',
      username: username.value,
      id: Date.now(),
    }
    socket.value.send(JSON.stringify(message))
  }

  socket.value.onmessage = (event) => {
    console.log('messages.value', messages.value)
    console.log('event', event)
    const message = JSON.parse(event.data)
    console.log('message', message)

    if (message.event == 'connection') {
      message.message = `${message.username} connected`
      messages.value.push(message)
    } else if (message.event == 'message') {
      messages.value.push(message)
    } else if (message.event == 'close') {
      message.message = `${message.username} disconnected`
      messages.value.push(message)
    } else if (Array.isArray(message)) {
      messages.value.push(...message)
    }
    if (message?.username !== username.value) {
      popUpElement.value?.play()
    }
    messageInput.value = ''
  }
  socket.value.onclose = () => {
    isUserConnected.value = false
    const message = {
      event: 'close',
      username: username.value,
      id: Date.now(),
    }
    socket.value.send(JSON.stringify(message))
  }
  socket.value.onerror = (e) => {
    console.log('WS ERROR', e)
  }
}

const disconnect = () => {
  socket.value.close()
}

const sendMessage = async (value) => {
  const message = {
    username: username.value,
    message: value,
    id: Date.now(),
    event: 'message',
  }
  socket.value.send(JSON.stringify(message))
}

const setMessages = () => {}

const showChat = () => {
  emit('close')
  isChatOpened.value = !isChatOpened.value
  if (!isChatOpened.value) {
    emit('close')
  }
}

const onNicknameEnter = (e) => {
  console.log('e', e)
  if (e.key == 'Enter') {
    localStorage.setItem('username', username.value)
    connect()
  }
}

const onInputEnter = (e) => {
  if (e.key == 'Enter') {
    sendMessage(messageInput.value)
    onEnterElement.value?.play()
  }
}

onMounted(() => {
  const user = localStorage.getItem('username')
  console.log('user', user)
  if (user) {
    username.value = user
    connect()
  }
  console.log('popUpElement.value', popUpElement.value)
})
</script>
<style lang="scss" scoped>
.chat {
  padding: 32px 16px 16px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: +1;
  background-color: var(--main-border-color);
  border-radius: var(--border-radius);

  &__window {
    padding: 8px;
    margin-bottom: 16px;
    width: 200px;
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: var(--border-radius);
    border: 1px solid;
    border-color: var(--item-background-color);
    color: var(--main-text-color);
    background-color: var(--gradient-from-color);
    scrollbar-width: thin;
  }
  &__window-arrow {
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: +1;
    color: #fff;
    stroke: #fff;
    path: #fff;
    fill: var(--secondary-text-color);
    &:last-child {
      top: 32px;
    }
  }
  &__input {
    width: 100%;
    min-width: 200px;
    height: 28px;
    padding-left: 8px;
    padding-right: 8px;
    // text-overflow: ellipsis;
    // overflow: hidden;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    // display: -webkit-box;
  }
  &__message {
    margin-bottom: 8px;
  }
  &__message-text {
    word-break: break-all;
  }
}
</style>
