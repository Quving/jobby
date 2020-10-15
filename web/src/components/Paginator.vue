<template>
  <v-container>
    <v-row justify="center">
      <v-btn @click="previousPage" :disabled="!hasPrevious" icon color="normal">
        <v-icon> mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn color="normal">{{ displayText }}</v-btn>
      <v-btn @click="nextPage" :disabled="!hasNext" icon color="normal">
        <v-icon> mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>


export default {
  data() {
    return {
      currentPage: 1,
      displayText: "",
    }
  },
  props: {
    hasNext: Boolean,
    hasPrevious: Boolean
  },

  created() {
    this.displayText = `Page ${this.currentPage}`;
  },
  methods: {
    nextPage: function () {
      this.currentPage += 1;
      this.displayText = `Page ${this.currentPage}`;
      this.$emit('next-page')
    },
    previousPage: function () {
      if (this.currentPage > 1) this.currentPage -= 1;
      this.displayText = `Page ${this.currentPage}`;
      this.$emit('previous-page')
    },
  }
}
</script>
