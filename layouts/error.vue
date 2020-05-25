<template>
  <div class="container">
    <h2 class="subtitle">Something went wrong. Reloading page in {{counter}} seconds</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 5
    };
  },
  mounted() {
    let self = this;
    let inter = setInterval(() => {
      if (self.counter === 0) {
        clearInterval(inter);
        window.location.reload(true);
      } else {
        self.counter -= 1;
      }
    }, 1000);
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>