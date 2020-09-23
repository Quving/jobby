<template>
  <v-container>
    <h1 class="text-center mb-7" style="color: gray">{{ header.toUpperCase() }}</h1>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  props: {
    header: String,
  }
}
</script>
<style></style>
