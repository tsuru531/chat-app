<template>
<select :name="name" @change="updateValue">
  <template v-for="(option, index) in options">
    <option :value="option.value" :key="index">
      {{ option.label }}
    </option>
  </template>
</select>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    value: { type: String, required: true },
    options: { type: Array, required: true },
    name: { type: String, required: true },
  },
  methods: {
    updateValue(e) {
      this.$emit("input", e.target.value)
    },
  },
  mounted() {
    this.$emit("input", this.options[0].value)
  },
}
</script>

<style scoped>

</style>
