<template>
  <router-view @userFound="setUserData"/>
  <router-link to="/" @click.prevent="logOut" class="logout">Log out</router-link>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from 'vue-router';

import { store } from "./composables/Store";

export default {
  setup() {
    const userFound = ref(false);
    const router = useRouter();

    const setUserData = data => {
      userFound.value = data;
      console.log(userFound.value);
      router.push({name:"User", params:{user: store.state.userData.login}});
    };

    const logOut = () => {
      userFound.value = false;
      store.clearUserData();
      store.clearRepos();
      router.push("/");
    }

    return {
      userFound,
      setUserData,
      logOut
    };
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 30px;
}

a {
  text-decoration: none;
  color: #0366d6;

  &:hover {
    text-decoration: underline;
  }
}

ul {
  padding: 0;
  margin: 0;

  li {
    list-style-type: none;
  }
}

h1 {
  font-size: 28px;
}
h2 {
  font-size: 22px;
}
h3 {
  font-size: 18px;
}

.input,
select {
  border: 1px solid lightgray;
  border-radius: 6px;
  width: 100%;
  display: block;
  margin-top: 5px;
  margin-bottom: 15px;
  line-height: 25px;
  padding: 5px 12px;
}

.btn {
  background: white;
  border: 1px solid lightgray;
  color: grey;
  padding: 5px 16px;
  font-size: 14px;
  border-radius: 6px;
  line-height: 25px;
  display: block;
  text-align: center;

  transition: all 0.7s;

  &:hover {
    color: white;
    background: grey;
  }
}

.logout{
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
