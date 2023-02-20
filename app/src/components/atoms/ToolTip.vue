<template>
<div class="tooltip -wrapper">
  <div ref="container" class="tooltip -container">
    <p class="tooltip -text">{{ text }}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'ToolTip',
  props: {
    text: String,
  },
  mounted() {
    const container = this.$refs.container
    const rect = container.getBoundingClientRect()
    const windowWidth = window.innerWidth
    if (rect.right > windowWidth - 40) {
      container.style.marginLeft = `-${rect.right - windowWidth + 40}px`
    }
  },
}
</script>

<style scoped>
.tooltip.-wrapper {
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, .2));
}
.tooltip.-container {
  max-width: calc(100vw - 80px);
  background-color: #fdfdfd;
  border-radius: 6px;
  padding: 8px 16px;
}
.tooltip.-container:before {
  content: '';
  position: absolute;
  left: 8px;
  bottom: -8px;
  width: 15px;
  height: 8px;
  background-color: #fdfdfd;
  clip-path: polygon(0 0, 100% 0%, 50% 100%);
}
.tooltip.-text {
  margin: 0;
  overflow-wrap: break-word;
}
</style>
