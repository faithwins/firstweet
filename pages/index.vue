<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">firstweet</h1>
      <h2 class="subtitle">Find first tweet by handle</h2>
      <div class="handle-input">
        <span>@</span>
        <input
          type="text"
          name="handle"
          v-model="handle"
          @keyup="search"
          placeholder="Start typing handle"
          autocomplete="off"
        />
      </div>

      <div class="warning">
        <em>*under construction*</em>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Tweep from "~/components/Tweep.vue";

export default {
  components: {
    Logo,
    Tweep
  },
  data() {
    return {
      handle: "",
      tweeps: [],
      source: this.$axios.CancelToken.source()
    };
  },
  methods: {
    async search() {
      if (this.handle.length > 1) {
        //if greater than 2, cancel previous call
        if (this.handle.length > 2) {
          this.source.cancel("request cancelled");
        }
        let searchUrl = `${process.env.twitter.Base_URL}/users/search.json?q=${this.handle}`;
        this.source = this.$axios.CancelToken.source();
        console.log(searchUrl);
        let data = await this.$axios
          .$get(searchUrl, {
            cancelToken: this.source.token,
            headers: {
              Authorization: `OAuth oauth_consumer_key="${process.env.twitter.Consumer_Key}",oauth_token="${process.env.twitter.Access_Token}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1590154453",oauth_nonce="q8yeiANHKaP",oauth_version="1.0",oauth_signature="8op4CK9WCR75%2Fgr5A%2BU6%2B53sYq8%3D"`
            }
          })
          .catch(e => {
            if (this.$axios.isCancel(error)) {
              console.log("Request canceled", error);
            } else {
              console.log(e);
            }
          });
        console.log(data);
      }
    }
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

.handle-input {
  display: flex;
  margin: 0.5em;
}
.handle-input span {
  padding: 15px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: large;
  background: #1da1f2;
  border: thin solid #366a8a;
  border-radius: 5px 0 0 5px;
  color: white;
}
.handle-input input {
  padding: 15px;
  width: 100%;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  border: thin solid #366a8a;
  border-radius: 0 5px 5px 0px;
}
.handle-input input:focus {
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
