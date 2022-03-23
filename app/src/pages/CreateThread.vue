<template>
<div>
  <Header />
  <h1>スレッド作成</h1>
  <CreateThreadForm />
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
