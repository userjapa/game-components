<template>
  <div>
    <div>
      <h2>Create</h2>
      <select v-model="type" @change="typeChanged(type)">
        <option disabled selected>Choose a type</option>
        <option value="ListenSelect">Listen and Select</option>
        <option value="CompleteDialog">Complete the Dialog</option>
        <option value="ReadSelect">Read and Select</option>
        <option value="VideoComplete">Watch and Complete</option>
      </select>
      <div class="size margin content">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Create",
  data () {
    return {
      type: ``
    }
  },
  methods: {
    typeChanged (name) {
      this.$router.replace({ name: name })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
