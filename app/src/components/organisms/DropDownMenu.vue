<template>
<div class="drop_down_menu-wrapper">
  <template v-if="isSignedIn">
    <div class="drop_down_menu-header">
      <p>{{ userName }}</p>
    </div>
    <div class="drop_down_menu-items">
      <button class="drop_down_menu-item" type="button" @click="toCreateThread">
        スレッドを作成する
      </button>
      <button class="drop_down_menu-item" type="button" @click="signOut">
        ログアウト
      </button>
    </div>
  </template>
  <template v-if="!isSignedIn">
    <div class="drop_down_menu-items">
      <button class="drop_down_menu-item" type="button" @click="toSignup">
        新規登録
      </button>
      <button class="drop_down_menu-item" type="button" @click="toSignin">
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
.drop_down_menu-wrapper {
  background-color: #fff;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow:
    0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%),
    0px 1px 3px 0px rgb(0 0 0 / 12%);
}
.drop_down_menu-header {
  padding: 16px;
}
.drop_down_menu-header > p {
  margin: 0;
}
.drop_down_menu-items {
  padding: 8px 0;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
.drop_down_menu-item {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0 16px;
  appearance: none;
  display: block;
  width: 100%;
  height: 40px;
  text-align: left;
}
.drop_down_menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
