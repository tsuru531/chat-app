<template>
<button :class="classObject" type="button" @click="click">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: 'BaseIconButton',
  props: {
    isInactive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    classObject() {
      return {
        active: !this.isInactive,
        inactive: this.isInactive,
      }
    },
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  min-width: 34px;
  height: 34px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
button.active:hover {
  background-color: rgba(0, 0, 0, .05);
}
button.inactive {
  cursor: default;
}
</style>
