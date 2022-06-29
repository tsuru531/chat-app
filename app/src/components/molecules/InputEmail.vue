<template>
<div>
  <Label>メールアドレス</Label>
  <input name="email" id="email" type="text" v-model="input_value">
</div>
</template>

<script>
import Label from '@/components/atoms/Label'

export default {
  name: 'InputEmail',
  components: {
    Label,
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
}
</script>

<style scoped>
  input {
    box-sizing: border-box;
    width: 100%;
  }
</style>
