<template>
<div>
  <Label>年齢層</Label>
  <SelectBox v-model="input_value" name="age" :options="options" />
</div>
</template>

<script>
import { threadOptions } from '@/helpers/definition'
import Label from '@/components/atoms/Label'
import SelectBox from '@/components/atoms/SelectBox'

export default {
  name: 'SelectAge',
  components: {
    Label,
    SelectBox,
  },
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      options: threadOptions.age,
    }
  },
  computed: {
    input_value: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style scoped>

</style>
