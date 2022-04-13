<template>
<div>
  <Header />
  <div class="content">
    <h1>スレッド作成</h1>
    <CreateThreadForm />
  </div>
</div>
</template>

<script>
import Header from '@/components/organisms/Header'
import CreateThreadForm from '@/components/organisms/CreateThreadForm'

export default {
  name: 'CreateThread',
  components: {
    Header,
    CreateThreadForm
  }
}
</script>

<style scoped>
  .content {
    box-sizing: border-box;
    padding: 0 16px;
  }
</style>
