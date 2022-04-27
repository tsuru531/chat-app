<template>
<div>
  <Label>ユーザー名</Label>
  <input name="name" id="name" type="text" @input="input">
</div>
</template>

<script>
import Label from '@/components/atoms/Label'

export default {
  name: 'InputName',
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
