<template>
  <router-view v-if="userFound"/>
  <SelectUser v-else @userFound="setUserData" />
</template>

<script>
import { ref } from "@vue/reactivity";
import SelectUser from "./components/SelectUser";

export default {
  components: {
    SelectUser
  },
  setup() {
    const userFound = ref(false);

    const setUserData = data => {
      userFound.value = data;
    };

    return {
      userFound,
      setUserData
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
</style>
