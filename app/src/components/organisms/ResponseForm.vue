<template>
<form class="response_form wrapper">
  <ResizeTextarea ref="resize_textarea" v-model="modelBody" />
  <div class="response_form bottom">
    <Handlename v-model="modelHandlename" />
    <SendIconButton :isActive="isNonemptyForm" @click="send" />
  </div>
</form>
</template>

<script>
import ResizeTextarea from '@/components/atoms/ResizeTextarea'
import Handlename from '@/components/organisms/Handlename'
import SendIconButton from '@/components/molecules/SendIconButton'

export default {
  name: 'ResponseForm',
  components: {
    ResizeTextarea,
    Handlename,
    SendIconButton,
  },
  props: {
    body: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      handlename: '',
    }
  },
  computed: {
    threadId() {
      return this.$store.getters['thread/id']
    },
    modelBody: {
      get() {
        return this.body
      },
      set(value) {
        this.$emit('change', value)
      },
    },
    modelHandlename: {
      get() {
        return this.handlename
      },
      set(value) {
        this.handlename = value
      }
    },
    isNonemptyForm() {
      return Boolean(this.body)
    },
  },
  methods: {
    send() {
      if (this.isNonemptyForm) {
        this.$store.dispatch('thread/comments/create', {
          threadId: this.threadId,
          handlename: this.handlename,
          body: this.body
        })
        this.$emit('change', '')
      }
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
