<template>
<div class="comment_item-wrapper">
  <CommentHeader
    :index="comment.index"
    :handlename="comment.handlename"
    :role="role"
    :reports="reports"
    :isDeleted="isDeleted"
  />
  <div class="comment-item body">
    <CommentBody :timestamp="createdAt">
      <template v-for="item in commentBodys">
        <template v-if="comment.deletedAt">{{ deletedText }}</template>
        <template v-else-if="item.type == 'text'">{{ item.body }}</template>
        <Anchor
          v-else-if="item.type == 'anchor'"
          :key="item.key"
          :index="Number(item.body)"
          :text="getComment(Number(item.body)).body"
        />
      </template>
    </CommentBody>
    <CommentButtons
      v-if="!comment.deletedAt"
      :isLike="isLike"
      :likesCount="likesCount"
      :showDelete="canDelete"
      @reply="reply"
      @like="switchLike"
      @delete="deleteItem"
    />
  </div>
  <Modal v-if="displayedLoginModal" @close="hideLoginModal">
    <template v-slot:content>
      <p>{{ loginModalText }}</p>
    </template>
    <template v-slot:footer>
      <div class="button-wrapper">
        <Button label="閉じる" @click="hideLoginModal"/>
        <router-link to="/signin">
          <Button label="ログイン" color="green" />
        </router-link>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentHeader from '@/components/organisms/CommentHeader'
import CommentBody from '@/components/molecules/CommentBody'
import CommentButtons from '@/components/molecules/CommentButtons'
import Anchor from '@/components/molecules/Anchor'
import Modal from '@/components/atoms/Modal'
import Button from '@/components/atoms/Button'
import { convertTimestamp, convertComment } from '@/modules'

export default {
  name: 'CommentItem',
  components: {
    CommentHeader,
    CommentBody,
    CommentButtons,
    Anchor,
    Modal,
    Button,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deletedText: 'このコメントは削除されました',
      loginModalText: 'この機能はログインすることで使用できます。',
      displayedLoginModal: false,
    }
  },
  computed: {
    ...mapGetters('user', [
      'uid',
      'role',
      'isSignedIn',
    ]),
    threadId() {
      return this.$store.getters['thread/id']
    },
    createdAt() {
      return convertTimestamp(this.comment.createdAt)
    },
    commentBodys() {
      return convertComment(this.comment.body)
    },
    isLike() {
      if (!this.comment.likes) return false
      return this.comment.likes.includes(this.uid)
    },
    likesCount() {
      if (!this.comment.likes) return 0
      return this.comment.likes.length
    },
    isDeleted() {
      return this.comment.deletedAt ? true : false
    },
    canDelete() {
      const uid = this.$store.getters['user/uid']
      const isOwner = uid === this.comment.uid && uid !== ''
      const isAdmin = this.$store.getters['user/isAdmin']
      return isOwner || isAdmin
    },
    reports() {
      if (this.comment.reports) {
        return this.comment.reports
      } else {
        return []
      }
    },
  },
  methods: {
    deleteItem() {
      this.$emit('deleteItem')
    },
    reply() {
      this.$emit('reply', this.comment.index)
    },
    async switchLike() {
      if (this.isSignedIn) {
        if (!this.isLike) {
          await this.$store.dispatch('thread/comments/addLike', this.comment.index)
        } else {
          await this.$store.dispatch('thread/comments/removeLike', this.comment.index)
        }
      } else {
        this.displayedLoginModal = true
      }
    },
    getComment(index) {
      return this.$store.getters['thread/comments/comment'](index)
    },
    hideLoginModal() {
      this.displayedLoginModal = false
    },
  },
}
</script>

<style scoped>
.comment_item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.comment-item.body {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
.button-wrapper {
  display: flex;
  gap: 8px;
}
</style>
