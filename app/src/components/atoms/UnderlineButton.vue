<template>
<button type="button" @click="click">
  {{ label }}
</button>
</template>

<script>
export default {
  name: 'UnderlineButton',
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
button {
  background-color: transparent;
  border: 0;
  border-bottom: solid 1px rgba(0, 0, 0, 1);
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
