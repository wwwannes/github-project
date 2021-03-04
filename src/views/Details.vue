<template>
  <div class="about">
    <h1>{{ route.params.name }}</h1>
    <div class="details__content">
      <p v-for="data in details" :key="data.node_id">{{ data.commit.message }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
  import { useRoute } from 'vue-router';
  import { apiCall } from '../composables/GlobalFunctions';

  export default {
    props: ["userName"],
    setup(props){
      const route = useRoute();

      const {data, errorMsg, loadData} = apiCall(`/repos/${props.userName}/${route.params.name}/commits`);
    
      loadData();

      const details = ref(data);

      console.log(details)

      return{
        route,
        details,
        errorMsg
      }
    }
  }
</script>