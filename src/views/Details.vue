<template>
  <div class="container" v-if="route.params.name">
    <div class="repo">
      <div class="repo__container">
        <UserTools :data="details" @updateList="reorderCommits" v-if="details.length > 0" />
        <div class="repo__container__header">
          <div clss="latest-update">
            <router-link :to="{name: 'Home'}">{{ userData.login }}</router-link> / {{ route.params.name }}
          </div>
          <span class="date">created 2 Mar 2018</span>
        </div>
        <div v-if="details.length > 0">
          <div class="repo__container__item" v-for="detail in details" :key="detail.node_id">
            <span class="msg">{{ detail.commit.message }}</span>
            <div class="user" v-if="detail.committer">
              <img :src="detail.committer.avatar_url" :alt="detail.committer.login" :title="detail.committer.login"/> 
              <span>{{ detail.committer.login }}</span>
            </div>
            <span class="date">Updated {{ formatDate(detail.commit.committer.date) }}</span>
          </div>
        </div>
      </div>
      <div class="repo__sidebar">
        <div class="repo__sidebar__about">
          <h3 class="title">About</h3>
          <p>All course files for the GraphQL tutorial playlist on The Net Ninja YouTube channel.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
  import { useRoute } from 'vue-router';
  import { apiCall, formatDate } from '../composables/GlobalFunctions';

  import UserTools from "../components/UserTools";

  export default {
    props: ["userData"],
    components:{
      UserTools
    },
    setup(props){
      const route = useRoute();
      const details = ref({});
      const errorMsg = ref({});

      const getDetails = async() => {
        const {data, errorMsg, loadData} = apiCall(`/repos/${props.userData.login}/${route.params.name}/commits?per_page=4`);
    
        await loadData();

        details.value = data.value;
        errorMsg.value = errorMsg;

        console.log(details)
      }

      getDetails();

      const reorderCommits = (data) => {
        details.value = data;
      }

      const getMoreDetails = async (id) => {
        const {data, errorMsg, loadData} = apiCall(`/repos/${props.userData.login}/${route.params.name}/commits/${id}`);
        await loadData();

        console.log(data, errorMsg);
      }

      return{
        route,
        details,
        errorMsg,
        formatDate,
        getDetails,
        getMoreDetails,
        reorderCommits
      }
    }
  }
</script>

<style lang="scss" scoped>
  .repo{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-flow: nowrap;

    &__container{
      width: calc((100%/3)*2);

      &__header{
        display: flex;
        justify-content: space-between;
        background: #f1f8ff;
        border: 1px solid #c8e1ff;
        border-bottom: none;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        padding: 15px;
        text-align: left;

        .latest-update,
        .date{
          font-size: 16px;
        }

        .date{
          text-align: right;
        }
      }
      &__item{
        padding: 20px 12px;
        border: 1px solid lightgray;
        border-bottom: none;
        display: flex;
        flex-direction: column;
        flex-flow: nowrap;
        align-items: center;
        justify-content: space-between;
        text-align: left;

        &:last-of-type{
          border-bottom: 1px solid lightgray;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        .msg,
        .user,
        .date{
          font-size: 14px;
          text-align: left;
          width: calc(100%/3);
        }

        .user{
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;

          img{
            height: 30px;
            border-radius: 50%;
            margin-right: 7px;
          }
        }

        .date{
          text-align: right;
        }
      }
    }

    &__sidebar{
      padding-left: 20px;
      width: calc(100%/3);
      text-align: left;

      &__about{
        .title{
          font-weight: bold;
          margin-bottom: 20px;
        }
        p{
          padding-bottom: 20px;
          border-bottom: 1px solid lightgray
        }
      }
    }
  }
</style>