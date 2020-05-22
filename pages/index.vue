<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">firstweet</h1>
      <h2 class="subtitle">Find first tweet by handle</h2>
      <div class="handle">
        <span>@</span>
        <input type="text" name="handle" v-model="handle" placeholder="Start typing handle" />
      </div>
      <div class="warning">
        <em>*under construction*</em>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  data() {
    return {
      handle: ""
    };
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: top;
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

.handle {
  display: flex;
}
.handle span {
  padding: 15px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: large;
  background: #1da1f2;
  border: thin solid #366a8a;
  border-radius: 5px 0 0 5px;
  color: white;
}
.handle input {
  padding: 15px;
  width: 100%;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  border: thin solid #366a8a;
  border-radius: 0 5px 5px 0px;
}
.handle input:focus {
  border-top: thin solid #1da1f2;
  border-right: thin solid #1da1f2;
  border-bottom: thin solid #1da1f2;
  outline: none;
}
.warning {
  color: coral;
  text-align: center;
  padding-top: 10px;
}
</style>
