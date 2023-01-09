<template>
<span>
  <Label>ハンドルネーム</Label>
  <input type="text" placeholder="名無しさん" v-model="modelValue">
</span>
</template>

<script>
import Label from '@/components/atoms/Label';

export default {
  name: 'InputHandlename',
  components: {
    Label,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped>

</style>
