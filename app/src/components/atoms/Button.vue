<template>
<button type="button" @click.stop="click" :class="classObject">
  <span>{{ label }}</span>
</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: String,
    color: {
      type: String,
      require: false
    }
  },
  computed: {
    classObject() {
      return {
        cp: this.color === 'primary',
        cd: this.color === 'danger',
        cg: this.color === 'green',
      }
    }
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
  padding: 8px 16px;
  appearance: none;
  border-radius: 4px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: normal;
  letter-spacing: 1.25px;
}
button.cp {
  background-color: #4676D7;
  color: #eee;
}
button.cd {
  background-color: #dc3545;
  color: #eee;
}
button.cg {
  background-color: #347D39;
  color: #eee;
}
</style>
