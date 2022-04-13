<template>
<div>
  <Label>話題</Label>
  <SelectBox v-model="input_value" name="topic" :options="options" />
</div>
</template>

<script>
import { threadOptions } from '@/helpers/definition'
import Label from '@/components/atoms/Label'
import SelectBox from '@/components/atoms/SelectBox'

export default {
  name: 'SelectTopic',
  components: {
    Label,
    SelectBox,
  },
  props: {
    value: { type: String, required: true },
  },
  data() {
    return {
      options: threadOptions.topic,
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
