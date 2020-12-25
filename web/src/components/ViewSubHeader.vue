<template>
  <v-container>
    <h3 class="text-center" style="color: gray">{{ header.toUpperCase() }}</h3>
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
