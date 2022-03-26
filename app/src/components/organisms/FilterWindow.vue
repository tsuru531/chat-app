<template>
<div class="filter_window -wrapper">
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
</div>
</template>

<script>
import { threadOptions } from '@/helpers/definition'
import SelectBox from '@/components/atoms/SelectBox'

export default {
  name: 'FilterWindow',
  components: {
    SelectBox,
  },
  props: {},
  data() {
    return {
      options: threadOptions,
    }
  },
  computed: {
    topic: {
      get() {
        return this.$store.getters['threads/search/topics'][0]
      },
      set(value) {
        this.$store.dispatch('threads/search/setTopics', [value])
      }
    },
    gender: {
      get() {
        return this.$store.getters['threads/search/gender']
      },
      set(value) {
        this.$store.dispatch('threads/search/setGender', value)
      }
    },
    age: {
      get() {
        return this.$store.getters['threads/search/ages'][0]
      },
      set(value) {
        this.$store.dispatch('threads/search/setAges', [value])
      }
    },
    place: {
      get() {
        return this.$store.getters['threads/search/places'][0]
      },
      set(value) {
        this.$store.dispatch('threads/search/setPlaces', [value])
      }
    },
  },
  methods: {}
}
</script>

<style scoped>
.filter_window.-wrapper {
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow:
      0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
  background-color: #FFF;
  padding: 8px;
}
</style>
