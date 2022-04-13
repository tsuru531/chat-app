<template>
<div>
  <Label>タイトル</Label>
  <input name="title" id="title" type="text" @input="input">
</div>
</template>

<script>
import Label from '@/components/atoms/Label'

export default {
  name: 'InputTitle',
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
