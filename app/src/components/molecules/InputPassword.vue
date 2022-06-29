<template>
<div>
  <Label>パスワード</Label>
  <input name="password" id="password" :type="isDisplayed ? 'text' : 'password'" v-model="input_value">
  <button type="button" @click="switchDisplay">{{ isDisplayed ? '非表示' : '表示' }}</button>
</div>
</template>

<script>
import Label from '@/components/atoms/Label'

export default {
  name: 'InputPassword',
  components: {
    Label,
  },
  data() {
    return {
      isDisplayed: false,
    }
  },
  props: {
    value: { type: String, required: true },
  },
  computed: {
    input_value: {
      get: function() {
        return this.value
      },
      set: function(value) {
        this.$emit('change', value)
      },
    }
  },
  methods: {
    switchDisplay: function() {
      this.isDisplayed = !this.isDisplayed
    },
  },
}
</script>

<style scoped>
  input {
    box-sizing: border-box;
    width: 100%;
  }
</style>
