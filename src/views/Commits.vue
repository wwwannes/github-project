<template>
  <div class="container" v-if="route.params.name">
    <div class="repo">
      <div class="repo__container">

        <UserTools :data="details" :searchables="searchables" :sortOptions="sortOptions" @updateList="reorderCommits" v-if="details.length > 0" />
        
        <div class="repo__container__header">
          <div clss="latest-update">
            <router-link :to="{name: 'Home'}">{{ userData.login }}</router-link> / {{ route.params.name }}
          </div>
          <span class="date">created 2 Mar 2018</span>
        </div>
        <div v-if="!loadingData" ref='scrollComponent'>
          <div class="repo__container__item" v-for="detail in details" :key="detail.node_id">
            <div class="repo__container__item__header">
              <router-link :to="{name: 'Files', params: {name: route.params.name, id: detail.sha, username: userData.login}}" class="msg">{{ detail.message }}</router-link>
              <div class="user" v-if="detail.committer">
                <img :src="detail.avatar" :alt="detail.committer" :title="detail.committer" v-if="detail.avatar"/> 
                <span>{{ detail.committer }}</span>
              </div>
              <span class="date">Updated {{ formatDate(detail.date) }}</span>
            </div>
          </div>
        </div>
        <Loader v-if="loadingData"/>
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
  import { onMounted, onUnmounted } from '@vue/runtime-core';
  import { useRoute } from 'vue-router';

  import { apiCall, formatDate } from '../composables/GlobalFunctions';

  import UserTools from "../components/UserTools";
  import Loader from "../components/Loader"

  export default {
    props: ["userData"],
    components:{
      UserTools,
      Loader
    },
    setup(props){
      const route = useRoute();
      const details = ref({});
      const errorMsg = ref({});
      const scrollComponent = ref(null);
      const searchables = ["message", "committer"];
      const sortOptions = [
        {"value": "message--asc", "name": "Message Ascending"},
        {"value": "message--desc", "name": "Message Descending"},
        {"value": "committer--asc", "name": "Committer Ascending"},
        {"value": "committer--desc", "name": "Committer Descending"},
        {"value": "date--asc", "name": "Date Ascending"},
        {"value": "date--desc", "name": "Date Descending"}
      ];
      const loadingData = ref(true);

      let page = 1;

      onMounted(() => {
        window.addEventListener("scroll", handleScroll)
      })
      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll)
      })

      // takes care off the api call to retreive commits
      const getDetails = async() => {
        const {data, errorMsg, loadData} = apiCall(`/repos/${props.userData.login}/${route.params.name}/commits?per_page=11&page=${page}`);

        await loadData();

        // Create object with only required data, easier for sorting and searching.
        const results = data.value.map(item => {
            return {...{
              "sha": item.sha,
              "message": item.commit.message,
              "committer": item.commit.committer.name,
              "avatar": item.committer ? item.committer.avatar_url : false,
              "date": item.commit.committer.date
            }}
        })

        // initialise commits list at the start, or add to it on scroll
        page === 1 ? details.value = results : details.value.push(...results)

        page ++;
        errorMsg.value = errorMsg;
        loadingData.value = false;
      }

      getDetails();

      // infinite scroll
      const handleScroll = () => {
        let element = scrollComponent.value
        if ( element.getBoundingClientRect().bottom < window.innerHeight && !loadingData.value) {
          getDetails();
        }
      }

      // handle the search and sort results
      const reorderCommits = (data) => {
        details.value = data;
      }

      return{
        route,
        details,
        errorMsg,
        formatDate,
        getDetails,
        reorderCommits,
        sortOptions,
        searchables,
        loadingData,
        scrollComponent
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
        &:last-of-type{
          &__header{
            border-bottom: 1px solid lightgray;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
          }
        }
        &__header{
          padding: 20px 12px;
          border: 1px solid lightgray;
          border-bottom: none;
          display: flex;
          flex-direction: column;
          flex-flow: nowrap;
          align-items: center;
          justify-content: space-between;
          text-align: left;

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