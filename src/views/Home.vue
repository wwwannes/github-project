<template>
  <h1>WWWannes repo</h1>
  <ul class="repolist" v-if="!errorMsg">
    <li class="repolist__item" v-for="item in repoList.data" :key="item.id">
      <router-link :to="{name: 'Details', params: {name: item.name}}" >{{ item.name }}</router-link>
    </li>
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
      console.log(resp)
    }).catch(err => {
      errorMsg.value = err;
    });

    onMounted(() => {
    });

    return{
      repoList,
      errorMsg
    }
  }
};
</script>
