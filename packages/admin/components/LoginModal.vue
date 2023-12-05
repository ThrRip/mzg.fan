<template>
  <div class="grid grid-areas-stack place-items-center">
    <div
      class="flex flex-col gap-y-8 justify-center items-center w-4/5 max-w-xs transition-opacity duration-300"
      :class="{ 'opacity-0': !props.visible }"
    >
      <div class="flex flex-col gap-y-1 text-white">
        登录至
        <h1 class="text-3xl">
          管理面板｜洺知-故犯
        </h1>
      </div>
      <form class="flex flex-col w-full">
        <input
          v-model="email"
          type="email"
          :readonly="props.authState === 'processing'"
          class="px-5 h-14 text-black bg-white-alta/75 focus:bg-white-alta/95
          rounded-t-xl focus:outline-none backdrop-blur transition-colors duration-500"
          placeholder="邮箱"
          @keydown.enter="submit"
        >
        <input
          v-model="password"
          type="password"
          :readonly="props.authState === 'processing'"
          class="px-5 h-14 text-black bg-white-alta/75 focus:bg-white-alta/95
          rounded-b-xl focus:outline-none backdrop-blur transition-colors duration-500"
          placeholder="密码"
          @keydown.enter="submit"
        >
      </form>
      <button
        class="grid grid-areas-stack place-items-center w-full h-12
        text-white bg-blue hover:bg-blue-a rounded-xl focus:outline outline-2 outline-offset-3 outline-blue-a
        transition duration-200 active:scale-95"
        @click="submit"
      >
        <transition-group
          enter-from-class="opacity-0"
          enter-active-class="transition-opacity duration-200"
          leave-active-class="transition-opacity duration-200"
          leave-to-class="opacity-0"
        >
          <span v-if="props.authState === ''" key="idle">登录</span>
          <font-awesome-icon v-if="props.authState === 'processing'" key="processing" :icon="['fas', 'circle-notch']" spin class="!h-5" />
          <font-awesome-icon v-if="props.authState === 'succeeded'" key="succeeded" :icon="['fas', 'check']" class="!h-5" />
          <span v-if="props.authState === 'failed'" key="failed" class="flex flex-row gap-x-2 items-center">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="!h-5" />
            请重试
          </span>
        </transition-group>
      </button>
    </div>
    <div
      class="-z-20 w-full max-w-lg h-full max-h-[30rem] bg-blue-l transition-opacity duration-300"
      :class="{ 'opacity-0': !props.visible }"
    />
  </div>
</template>

<script setup lang="ts">
import type { BackendAuthState } from '../app.vue'

const props = defineProps<{
  visible: boolean
  authState: BackendAuthState
}>()

const emit = defineEmits<{
  submit: [email: string, password: string]
}>()

const email = ref<string>('')
const password = ref<string>('')

function submit () {
  if (props.authState === '' || props.authState === 'failed') {
    emit('submit', email.value, password.value)
  }
}
</script>
