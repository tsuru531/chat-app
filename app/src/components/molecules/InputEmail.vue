<template>
<div>
  <Label>メールアドレス</Label>
  <input name="email" id="email" type="text" @input="input">
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
  methods: {
    input: function(e) {
      this.$emit('input', e.target.value);
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
