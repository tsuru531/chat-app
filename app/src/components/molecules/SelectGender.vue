<template>
<div>
  <Label>性別</Label>
  <SelectBox v-model="input_value" name="gender" :options="options" />
</div>
</template>

<script>
import { threadOptions } from '@/helpers/definition'
import Label from '@/components/atoms/Label'
import SelectBox from '@/components/atoms/SelectBox'

export default {
  name: 'SelectGender',
  components: {
    Label,
    SelectBox,
  },
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      options: threadOptions.gender,
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
