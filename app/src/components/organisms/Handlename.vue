<template>
<div>
  <dl>
    <dt>ハンドルネーム</dt>
    <dd>{{ value ? value : "名無しさん" }}</dd>
  </dl>
  <UnderlineButton label="ハンドルネームを変更" @click="showModal" />
  <portal to="modal">
    <Modal v-if="modal.isDisplayed" @close="hideModal">
      <template v-slot:content>
        <input type="text" placeholder="名無しさん" v-model="modelHandlename">
      </template>
      <template v-slot:footer>
        <Button label="閉じる" @click="hideModal" />
        <Button ref="change" label="変更" color="primary" @click="changeHandlename" />
      </template>
    </Modal>
  </portal>
</div>
</template>

<script>
import Modal from '@/components/atoms/Modal'
import Button from '@/components/atoms/Button'
import UnderlineButton from '@/components/atoms/UnderlineButton'

export default {
  name: 'Handlename',
  components: {
    Modal,
    Button,
    UnderlineButton,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      modal: {
        isDisplayed: false,
        handlename: '',
      },
    }
  },
  computed: {
    modelHandlename: {
      get() {
        return this.modal.handlename
      },
      set(value) {
        this.modal.handlename = value
      },
    },
  },
  methods: {
    showModal() {
      this.modal.handlename = this.value
      this.modal.isDisplayed = true
    },
    hideModal() {
      this.modal.isDisplayed = false
      this.modal.handlename = ''
    },
    changeHandlename() {
      this.$emit('input', this.modal.handlename)
      this.hideModal()
    },
  },
}
</script>

<style scoped>
dl {
  font-size: 14px;
  margin: 0;
}
dt {
  display: inline;
}
dt::after {
  content: ':';
  margin-right: 4px;
}
dd {
  display: inline;
  margin: 0;
}
</style>
