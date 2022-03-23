<template>
<form>
  <div>
    <label for="title">タイトル</label>
    <input name="title" id="title" type="text" v-model="title">
  </div>
  <div>
    <label for="comment">本文</label>
    <textarea name="comment" id="comment" rows="5" v-model="comment"></textarea>
  </div>
  <div>
    <label for="topic">話題</label>
    <SelectBox v-model="topic" name="topic" :options="this.options.topic" />
  </div>
  <div>
    <label for="gender">性別</label>
    <SelectBox v-model="gender" name="gender" :options="this.options.gender" />
  </div>
  <div>
    <label for="age">年齢層</label>
    <SelectBox v-model="age" name="age" :options="this.options.age" />
  </div>
  <div>
    <label for="place">場所</label>
    <SelectBox v-model="place" name="place" :options="this.options.place" />
  </div>
  <button type="button" @click="createThread">スレッドを作成する</button>
</form>
</template>

<script>
import { threadOptions } from '@/helpers/definition'
import SelectBox from '@/components/atoms/SelectBox'

export default {
  name: 'CreateThreadForm',
  components: {
    SelectBox,
  },
  data() {
    return {
      options: threadOptions,
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
