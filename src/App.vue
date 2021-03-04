<template>
  <router-view  v-if="Object.keys(userdata).length > 0" :userData="userdata"/>
  <SelectUser v-else @userFound="setUserData"/>
</template>

<script>
import { ref } from '@vue/reactivity';
import SelectUser from "./components/SelectUser";

export default {
  components: {
    SelectUser
  },
  setup(){
    const userdata = ref([]);

    const setUserData = (data) => {
      userdata.value = data.value;
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

  a{
    text-decoration: none;
  }

  ul{
    padding: 0;
    margin: 0;

    li{
      list-style-type: none;
    }
  }

  h1{
    font-size: 28px;
  }
  h2{
    font-size: 22px;
  }
  h3{
    font-size: 18px;
  }

  .input,
  select{
    border: 1px solid lightgray;
    border-radius: 6px;
    width: calc(100% - 25px);
    display: block;
    margin-top: 5px;
    margin-bottom: 15px;
    line-height: 25px;
    padding: 5px 12px;
  }

  .btn{
    background: white;
    border: 1px solid lightgray;
    color: grey;
    padding: 5px 16px;
    font-size: 14px;
    border-radius: 6px;
    line-height: 25px;
    display: block;
    text-align: center;

    transition: all .7s;

    &:hover{
      color: white;
      background: grey;
    }
  }
</style>
