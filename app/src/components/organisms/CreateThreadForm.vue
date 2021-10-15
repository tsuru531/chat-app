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
    <select name="topic" id="topic" v-model="topic">
      <option value="">話題を選択する</option>
      <option value="雑談">雑談</option>
    </select>
  </div>
  <div>
    <label for="gender">性別</label>
    <select name="gender" id="gender" v-model="gender">
      <option value="">どちらでもいい</option>
      <option value="男">男</option>
      <option value="女">女</option>
    </select>
  </div>
  <div>
    <label for="age">年齢層</label>
    <select name="age" id="age" v-model="age">
      <option value="">何歳でもいい</option>
      <option value="10代">10代</option>
      <option value="20代">20代</option>
      <option value="30代">30代</option>
      <option value="40代">40代</option>
      <option value="50代">50代</option>
      <option value="60代">60代</option>
    </select>
  </div>
  <div>
    <label for="place">場所</label>
    <select name="place" id="place" v-model="place">
      <option value="">どこでもいい</option>
      <option value="東京都">東京都</option>
    </select>
  </div>
  <div>
    <input name="show_id" id="show_id" type="checkbox" v-model="show_id">
    <label for="show_id">スレッド内でIDを表示する</label>
  </div>
  <div>
    <input name="character_limit" id="character_limit" type="checkbox" v-model="character_limit">
    <label for="character_limit">レスポンスの文字数を制限する</label>
  </div>
  <div>
    <label for="limit_count">文字数</label>
    <input name="limit_count" id="limit_count" type="number" v-model="limit_count">
  </div>
  <button type="button" @click="createThread">スレッドを作成する</button>
</form>
</template>

<script>
export default {
  name: 'CreateThreadForm',
  data() {
    return {
      title: '',
      comment: '',
      topic: '',
      gender: '',
      age: '',
      place: '',
      show_id: false,
      character_limit: false,
      limit_count: 0
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
        show_id: this.show_id,
        character_limit: this.character_limit,
        limit_count: this.limit_count
      })
    }
  }
}
</script>
