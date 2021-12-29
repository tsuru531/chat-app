<template>
<textarea v-model="modelText" ref="textarea" :style="styles"></textarea>
</template>

<script>
export default {
  name: 'ResizeTextarea',
  props: {
    text: String
  },
  data() {
    return {
      height: 'auto'
    }
  },
  computed: {
    modelText: {
      get() {
        return this.text
      },
      set(value) {
        this.$emit('change', value)
      }
    },
    styles() {
      return {
        'height': this.height
      }
    }
  },
  watch: {
    text() {
      this.resize()
    }
  },
  methods: {
    resize() {
      this.height = 'auto'
      this.$nextTick(() => {
        this.height = `${this.$refs.textarea.scrollHeight}px`
      })
    }
  },
  mounted() {
    this.resize()
  }
}
</script>

<style scoped>
textarea {
  box-sizing: border-box;
  appearance: none;
  display: block;
  resize: none;
  width: 100%;
  max-height: 40vh;
  padding: 8px;
  border: 0;
  outline: none;
  background: transparent;
}
</style>