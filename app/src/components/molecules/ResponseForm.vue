<template>
<form>
  <textarea type="text" v-model="textarea_response"></textarea>
  <input type="text" placeholder="名無しさん" v-model="input_handlename">
  <SendIconButton @click="send" />
</form>
</template>

<script>
import SendIconButton from '@/components/atoms/SendIconButton'

export default {
  name: 'ResponseForm',
  components: {
    SendIconButton
  },
  props: {
    response: String,
    handlename: String
  },
  computed: {
    textarea_response: {
      get() {
        return this.response
      },
      set(value) {
        this.$emit('change_response', value)
      }
    },
    input_handlename: {
      get() {
        return this.handlename
      },
      set(value) {
        this.$emit('change_handlename', value)
      }
    }
  },
  methods: {
    send() {
      this.$emit('send')
    }
  }
}
</script>

<style scoped>

</style>