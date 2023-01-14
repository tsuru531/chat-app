<template>
<BaseIconButton @click="click">
  <Icons type="send-active" />
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
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
