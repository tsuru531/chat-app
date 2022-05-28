<template>
<div class="header-wrapper">
  <header class="header">
    <div>
      <router-link to="/">
        <LogoText />
      </router-link>
    </div>
    <div class="header-right">
      <SearchWindow />
      <div class="header-account-wrapper" ref="dropDown">
        <AccountIconButton @click="toggleDropDown" />
        <div class="header-drop_down" v-if="isOpenDropDown">
          <DropDownMenu />
        </div>
      </div>
    </div>
  </header>
</div>
</template>

<script>
import LogoText from '@/components/atoms/LogoText'
import AccountIconButton from '@/components/atoms/AccountIconButton'
import SearchWindow from '@/components/organisms/SearchWindow'
import DropDownMenu from '@/components/organisms/DropDownMenu'

export default {
  name: 'Header',
  components: {
    LogoText,
    AccountIconButton,
    SearchWindow,
    DropDownMenu,
  },
  data() {
    return {
      isOpenDropDown: false,
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpenDropDown = !this.isOpenDropDown
    },
  },
  mounted() {
    window.addEventListener('click', this._onBlurHandler = (event) => {
      if (this.$refs.dropDown.contains(event.target)) return false;
      this.$data.isOpenDropDown = false;
    });
  },
  beforeDestroy() {
    window.removeEventListener('click', this._onBlurHandler);
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 64px;
  padding: 8px 16px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-account-wrapper {
  position: relative;
}
.header-drop_down {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  width: 240px;
  height: 0px;
  margin-top: 44px;
  margin-right: 4px;
  max-height: calc(-44px + 100vh);
  max-width: calc(-24px + 100vw);
}
</style>
