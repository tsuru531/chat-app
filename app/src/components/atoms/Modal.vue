<template>
<div class="dialog-overlay" @click="close">
  <div class="dialog-container">
    <div class="dialog-content">
      <slot name="content"></slot>
    </div>
    <footer class="dialog-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.dialog-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  padding: 8px 24px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow:
    0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%),
    0px 9px 46px 8px rgb(0 0 0 / 12%);
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
