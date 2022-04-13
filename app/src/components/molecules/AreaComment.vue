<template>
<div>
  <Label>本文</Label>
  <textarea name="comment" rows="5" @input="input"></textarea>
</div>
</template>

<script>
import Label from '@/components/atoms/Label'

export default {
  name: 'AreaComment',
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
  textarea {
    box-sizing: border-box;
    resize: none;
    width: 100%;
  }
</style>
