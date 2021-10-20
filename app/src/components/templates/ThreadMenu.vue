<template>
<div>
  <router-link :to="{ path: `/thread/${threadId}` }">スレッドに戻る</router-link>
  <ThreadMenu />
</div>
</template>

<script>
import ThreadMenu from '@/components/organisms/ThreadMenu'

export default {
  name: 'ThreadMenuTemplate',
  components: {
    ThreadMenu
  },
  props: {
    threadId: String,
  }
}
</script>