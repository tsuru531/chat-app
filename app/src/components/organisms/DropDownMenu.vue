<template>
<div class="drop_down_menu -wrapper">
  <template v-if="isSignedIn">
    <div>
      <p>{{ userName }}</p>
    </div>
    <div>
      <button type="button" @click="toCreateThread">
        スレッドを作成する
      </button>
      <button type="button" @click="signOut">
        ログアウト
      </button>
    </div>
  </template>
  <template v-if="!isSignedIn">
    <div>
      <button type="button" @click="toSignup">
        新規登録
      </button>
      <button type="button" @click="toSignin">
        ログイン
      </button>
    </div>
  </template>
</div>
</template>

<script>
import Router from '@/router'

export default {
  name: 'DropDownMenu',
  computed: {
    isSignedIn() {
      return this.$store.getters['user/isSignedIn']
    },
    userName() {
      return this.$store.getters['user/name']
    },
  },
  methods: {
    toCreateThread() {
      Router.push('/thread/post')
    },
    toSignup() {
      Router.push('/signup')
    },
    toSignin() {
      Router.push('/signin')
    },
    signOut() {
      this.$store.dispatch('user/signOut')
    },
  },
}
</script>

<style scoped>
.drop_down_menu.-wrapper {
  background-color: #fff;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow:
    0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
}
</style>
