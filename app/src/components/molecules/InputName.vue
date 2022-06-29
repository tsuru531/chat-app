<template>
<div>
  <Label>ユーザー名</Label>
  <input name="name" id="name" type="text" v-model="input_value">
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
