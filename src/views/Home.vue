<template>
  <h1>{{ props.userName }} repo</h1>
  <input type="text" v-model="searchTerm" @keyup="searchRepos"/>
  <ul class="repolist" v-if="!errorMsg">
    <li class="repolist__item" v-for="item in repos" :key="item.id">
      <router-link :to="{name: 'Details', params: {name: item.name}}" >{{ item.name }}</router-link>
    </li>
  </ul>
  <div class="error" v-if="errorMsg">{{ errorMsg.message }}</div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { apiCall } from '../composables/APIcalls';

export default {
  name: "Home",
  props: ["userName"],
  setup(props){
    const searchTerm = ref('');
    const { data, errorMsg, loadData } = apiCall(`/users/${props.userName}/repos`);

    loadData();

    const repos = ref(data);

    /*const searchRepos = computed(() => {
      return repos.value.filter(item => {
        return Object.values(item).includes(searchTerm.value);
      });
    })*/

    return{
      props,
      repos,
      errorMsg,
      searchTerm,
      //searchRepos
    }
  }
};
</script>
