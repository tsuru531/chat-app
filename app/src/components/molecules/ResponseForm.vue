<template>
<form class="response_form wrapper">
  <ResizeTextarea ref="resize_textarea" :text="response" @change="changeResponse" />
  <div class="response_form bottom">
    <input type="text" placeholder="名無しさん" v-model="modelHandlename">
    <SendIconButton @click="send" />
  </div>
</form>
</template>

<script>
import ResizeTextarea from '@/components/atoms/ResizeTextarea'
import SendIconButton from '@/components/atoms/SendIconButton'

export default {
  name: 'ResponseForm',
  components: {
    ResizeTextarea,
    SendIconButton
  },
  props: {
    response: String,
    handlename: String
  },
  computed: {
    modelHandlename: {
      get() {
        return this.handlename
      },
      set(value) {
        this.$emit('change_handlename', value)
      }
    }
  },
  methods: {
    changeResponse(value) {
      this.$emit('change_response', value)
    },
    send() {
      this.$emit('send')
    },
    focusTextarea() {
      this.$refs.resize_textarea.focus()
    }
  }
}
</script>

<style scoped>
.response_form.wrapper {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
.response_form.bottom {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 4px;
}
</style>