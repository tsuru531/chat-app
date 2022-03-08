<template>
<span
  class="anchor"
  ref="ancher"
  @mouseover="mouseover"
  @mouseleave="mouseleave"
>
  >>{{ this.index }}
  <div v-if="isMouseover" class="anchor -tooltip">
    <ToolTip :text="text" />
  </div>
</span>
</template>

<script>
import ToolTip from '@/components/atoms/ToolTip'

export default {
  name: 'Anchor',
  components: {
    ToolTip,
  },
  props: {
    index: Number,
    text: String,
  },
  data() {
    return {
      isMouseover: false,
    }
  },
  methods: {
    mouseover() {
      this.isMouseover = true
    },
    mouseleave() {
      this.isMouseover = false
    },
  },
}
</script>

<style scoped>
.anchor {
  position: relative;
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 2px;
}
.anchor.-tooltip {
  position: absolute;
  left: 4px;
  bottom: 32px;
  z-index: 100;
  border: none;
}
</style>
