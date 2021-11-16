<template>
<button type="button" @click="click">
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
</button>
</template>

<script>
export default {
  name: 'DeleteButton',
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
button:hover {
  background-color: rgba(0, 0, 0, .05);
}
</style>