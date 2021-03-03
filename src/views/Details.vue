<template>
  <div class="about">
    <h1>{{ route.params.name }}</h1>
    <div class="details__content">
      <p v-for="data in details" :key="data.node_id">{{ data.commit.message }}</p>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { ref } from "@vue/runtime-core";
  import { useRoute } from 'vue-router';
  import axios from "axios";

  export default {
    setup(){
      const route = useRoute();

      const details = ref([]);
      const errorMsg = ref('');

      axios.get(`https://api.github.com/repos/wwwannes/${route.params.name}/commits`).then(resp => {
        errorMsg.value = '';
        details.value =  resp.data;
        console.log(details.value);
      }).catch(err => {
        errorMsg.value = err;
      });

      return{
        route,
        details,
        errorMsg
      }
    }
  }
</script>