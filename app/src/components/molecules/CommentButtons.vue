<template>
<div>
  <ReplyButton @click="emitReply" />
  <LikeButton :isLike="isLike" :count="likesCount" @click="emitLike" />
  <DeleteButton v-if="showDelete" @click="emitDelete" />
</div>
</template>

<script>
import ReplyButton from '@/components/atoms/ReplyButton';
import LikeButton from '@/components/molecules/LikeButton';
import DeleteButton from '@/components/atoms/DeleteButton';

export default {
  name: 'CommentButtons',
  components: {
    ReplyButton,
    LikeButton,
    DeleteButton,
  },
  props: {
    isLike: {
      type: Boolean,
      required: true,
    },
    likesCount: {
      type: Number,
      required: true,
      validator: count => {
        return count >= 0;
      },
    },
    showDelete: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    emitReply() {
      this.$emit('reply')
    },
    emitLike() {
      this.$emit('like')
    },
    emitDelete() {
      this.$emit('delete')
    },
  },
}
</script>

<style scoped>

</style>
