<template>
<form class="create_thread_form">
  <InputTitle v-model="title" />
  <AreaComment v-model="comment" />
  <SelectTopic v-model="topic" />
  <SelectGender v-model="gender" />
  <SelectAge v-model="age" />
  <SelectPlace v-model="place" />
  <button type="button" @click="createThread">スレッドを作成する</button>
</form>
</template>

<script>
import InputTitle from '@/components/molecules/InputTitle'
import AreaComment from '@/components/molecules/AreaComment'
import SelectTopic from '@/components/molecules/SelectTopic'
import SelectGender from '@/components/molecules/SelectGender'
import SelectAge from '@/components/molecules/SelectAge'
import SelectPlace from '@/components/molecules/SelectPlace'

export default {
  name: 'CreateThreadForm',
  components: {
    InputTitle,
    AreaComment,
    SelectTopic,
    SelectGender,
    SelectAge,
    SelectPlace,
  },
  data() {
    return {
      title: '',
      comment: '',
      topic: '',
      gender: '',
      age: '',
      place: '',
      showId: false,
      characterLimit: false,
      limitCount: 0
    }
  },
  methods: {
    createThread() {
      this.$store.dispatch('thread/createThread', {
        title: this.title,
        comment: this.comment,
        topic: this.topic,
        gender: this.gender,
        age: this.age,
        place: this.place,
        showId: this.showId,
        characterLimit: this.characterLimit,
        limitCount: this.limitCount
      })
    }
  }
}
</script>

<style scoped>
  .create_thread_form {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: min(100%, 400px);
    padding: 16px;
    border: solid 1px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
  }
</style>
