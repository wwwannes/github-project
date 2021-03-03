<template>
  <router-view  v-if="userdata" :userName="userdata.login"/>
  <SelectUser v-if="!userdata" @userFound="setUserData" />
</template>

<script>
import { ref } from '@vue/reactivity';
import SelectUser from "./components/SelectUser";

export default {
  components: {
    SelectUser
  },
  setup(){
    const userdata = ref(null);

    const setUserData = (data) => {
      userdata.value = ref(data);
      console.log(data);
    }

    return{
      userdata,
      setUserData
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
