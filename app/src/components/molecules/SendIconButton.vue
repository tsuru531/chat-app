<template>
<BaseIconButton @click="click" :isInactive="!isActive">
  <Icons :type="isActive ? 'send-active' : 'send-inactive'" />
</BaseIconButton>
</template>

<script>
import BaseIconButton from '@/components/atoms/BaseIconButton'
import Icons from '@/components/atoms/Icons'

export default {
  name: 'SendIconButton',
  components: {
    Icons,
    BaseIconButton,
  },
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
