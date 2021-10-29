<template>
<button type="button" @click="click">
  {{ value }}
</button>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    value: String
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: normal;
  letter-spacing: 1.25px;
}
button:hover {
  background-color: rgba(0, 0, 0, .07)
}
button:active {
  background-color: rgba(0, 0, 0, .14)
}
</style>