<template>
  <h1>WWWannes repo</h1>
  <ul class="repo__List" v-if="!errorMsg">
    <li v-for="item in repoList.data" :key="item.id">{{ item.name }}</li>
  </ul>
  <div class="error" v-if="errorMsg">{{ errorMsg.message }}</div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

export default {
  name: "Home",
  components: {},
  setup(){
    const repoList = ref([]);
    const errorMsg = ref('');

    axios.get("https://api.github.com/users/wwwannes/repos").then(resp => {
      errorMsg.value = '';
      repoList.value =  resp;
    }).catch(err => {
      errorMsg.value = err;
    });
    console.log(repoList.value)

    onMounted(() => {
    });

    return{
      repoList,
      errorMsg
    }
  }
};
</script>
