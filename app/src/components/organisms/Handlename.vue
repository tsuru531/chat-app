<template>
<div>
  <dl>
    <dt>ハンドルネーム</dt>
    <dd>{{ value ? value : "名無しさん" }}</dd>
  </dl>
  <UnderlineButton label="ハンドルネームを変更" @click="showModal" />
  <portal to="modal">
    <template v-if="modal.isDisplayed">
      <Modal v-if="isSignedIn" ref="handlename_modal" @close="hideModal">
        <template v-slot:content>
          <input type="text" placeholder="名無しさん" v-model="modelHandlename">
        </template>
        <template v-slot:footer>
          <Button label="閉じる" @click="hideModal" />
          <Button ref="change" label="変更" color="primary" @click="changeHandlename" />
        </template>
      </Modal>
      <Modal v-else-if="!isSignedIn" ref="signin_modal" @close="hideModal">
        <template v-slot:content>
          この機能はログインすることで使用できるようになります。
        </template>
        <template v-slot:footer>
          <Button label="閉じる" @click="hideModal" />
          <router-link to="/signin">
            <Button ref="signin" label="ログイン" color="primary" @click="changeHandlename" />
          </router-link>
        </template>
      </Modal>
    </template>
  </portal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    ...mapGetters({
      isSignedIn: 'user/isSignedIn',
    }),
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
