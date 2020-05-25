<template>
  <div class="container">
    <div>
      <logo />

      <h2 class="subtitle">Find last tweet by handle</h2>
      <div class="handle-input">
        <span>@</span>
        <input
          type="text"
          name="handle"
          v-model="handle"
          @keyup.enter="search"
          :placeholder="placeholder"
          autocomplete="off"
        />
      </div>

      <transition-group name="tweeps">
        <tweep
          class="tweeps-item"
          v-for="tweep in tweeps"
          :key="tweep.id"
          :tweep="tweep"
          @click="retrieveTweet"
        ></tweep>
      </transition-group>

      <transition name="slide-fade">
        <tweet v-show="tweet != ''" :id="tweet" :key="key"></tweet>
      </transition>
      <div v-if="loading">
        <span>loading...</span>
      </div>
      <!--<div class="warning">
        <em>*under construction*</em>
      </div>-->
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Tweep from "~/components/Tweep.vue";
import Tweet from "~/components/Tweet.vue";

export default {
  components: {
    Logo,
    Tweep,
    Tweet
  },
  data() {
    return {
      handle: "",
      tweeps: [],
      tweet: "",
      key: 0,
      loading: false,
      placeholder: "Put in handle here and hit Enter",
      source: this.$axios.CancelToken.source()
    };
  },
  methods: {
    async search() {
      this.loading = true;
      this.tweet = "";
      let apiUrl = `/api/tweeps?q=${this.handle}`;
      this.source = this.$axios.CancelToken.source();
      let data = await this.$axios
        .$get(apiUrl, {
          cancelToken: this.source.token
        })
        .catch(e => {
          if (this.$axios.isCancel(error)) {
            console.log("Request canceled", error);
          } else {
            console.log(e);
          }
        });
      this.loading = false;
      this.tweeps = data
        .filter(u => {
          return (
            u.status &&
            u.screen_name &&
            u.screen_name.toUpperCase().startsWith(this.handle.toUpperCase())
          );
        })
        .map(u => {
          return {
            id: u.id,
            name: u.name,
            screen_name: u.screen_name,
            location: u.location,
            description: u.description,
            profile_image_url: u.profile_image_url,
            verified: u.verified,
            status: u.status.id_str
          };
        });
    },
    async retrieveTweet(tweep) {
      this.tweeps = [];
      this.handle = "";
      this.placeholder = tweep.screen_name;
      this.tweet = tweep.status;
      this.key += 1;
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
.tweeps {
  padding: 10px;
  border-radius: 5px;
  border-top: thin solid #6589a0;
}

.tweeps-item {
  transition: all 2s;
  display: inline-block;
  margin-right: 10px;
}
.tweeps-enter
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.tweeps-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.tweeps-leave-active {
  position: absolute;
  transition: all 1s;
}
.tweet {
  transition: all 2s;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
