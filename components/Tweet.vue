<template>
  <div id="tweet-container" class="tweet"></div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    twttr.widgets.createTweet(
      `${this.id}`,
      document.getElementById("tweet-container"),
      {
        conversation: "none",
        dnt: true,
        cards: "hidden"
      }
    );
  }
};
</script>

<style scoped>
.tweet {
  border-radius: 5px;
  padding: 10px;
}
</style>