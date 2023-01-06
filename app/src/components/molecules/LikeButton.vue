<template>
<BaseIconButton @click="click">
  <Icons :type="iconType" />
  <Counter :count="count" />
</BaseIconButton>
</template>

<script>
import BaseIconButton from '@/components/atoms/BaseIconButton';
import Icons from '@/components/atoms/Icons';
import Counter from '@/components/atoms/Counter';

export default {
  name: 'LikeButton',
  components: {
    BaseIconButton,
    Icons,
    Counter,
  },
  props: {
    isLike: {
      type: Boolean,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    iconType() {
      return this.isLike ? 'like-true' : 'like-false'
    },
  },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>

</style>
