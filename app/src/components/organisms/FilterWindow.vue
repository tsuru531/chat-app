<template>
<div class="filter_window -wrapper">
  <SelectTopic v-model="topic" />
  <SelectGender v-model="gender" />
  <SelectAge v-model="age" />
  <SelectPlace v-model="place" />
</div>
</template>

<script>
import SelectTopic from '@/components/molecules/SelectTopic'
import SelectGender from '@/components/molecules/SelectGender'
import SelectAge from '@/components/molecules/SelectAge'
import SelectPlace from '@/components/molecules/SelectPlace'

export default {
  name: 'FilterWindow',
  components: {
    SelectTopic,
    SelectGender,
    SelectAge,
    SelectPlace,
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
