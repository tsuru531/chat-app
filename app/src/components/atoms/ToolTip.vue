<template>
<div class="tooltip -wrapper">
  <div class="tooltip -container">
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
}
</script>

<style scoped>
.tooltip.-wrapper {
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, .4));
}
.tooltip.-container {
  max-width: 100vw;
  min-width: 32px;
  background-color: #F3F3F3;
  border-radius: 6px;
  padding: 4px 8px;
}
.tooltip.-container:before {
  content: '';
  position: absolute;
  left: 8px;
  bottom: -8px;
  width: 15px;
  height: 8px;
  background-color: #F3F3F3;
  clip-path: polygon(0 0, 100% 0%, 50% 100%);
}
.tooltip.-text {
  margin: 0;
}
</style>
