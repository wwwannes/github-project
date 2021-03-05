<template>
  <div class="container">
    <div class="repos">
      <div class="repos__user">
        <div class="repos__user__image">
          <img :src="userData.avatar_url" :alt="userData.login"/>
        </div>
        <div class="repos__user__info">
          <h2 class="name" v-if="userData.name">{{ userData.name }}</h2>
          <h1 class="username row" v-if="userData.login">{{ userData.login }}</h1>
          <p class="bio row" v-if="userData.bio">{{ userData.bio }}</p>
          <a :href="userData.html_url" target="_blank" class="visit btn row">Github page</a>
          <span class="followers row">{{ userData.followers }} followers, {{ userData.following }} following</span>
          <ul class="more-info row">
            <li v-if="userData.company">{{ userData.company }}</li>
            <li v-if="userData.location">{{ userData.location }}</li>
          </ul>
        </div>
      </div>
      <div class="repos__content">

        <!--<div class="repos__content__user_tools">
          <input type="text" v-model="searchTerm" class="input" placeholder="Search for repositories..."/>
          <select v-model="sorting">
            <option value="name--asc">Name Ascending</option>
            <option value="name--desc">Name Descending</option>
            <option value="created_at--asc">Created Ascending</option>
            <option value="created_at--desc">Created Descending</option>
            <option value="updated_at--asc">Updated Ascending</option>
            <option value="updated_at--desc">Updated Descending</option>
          </select>
        </div>-->

        <UserTools :data="repos" @updateList="reorderRepo" v-if="repos.length > 0"/>

        <ul class="repolist" v-if="!error">
          <li class="repolist__item" v-for="repo in repos" :key="repo.id">
            <div class="repolist__item__header">
              <h3><router-link :to="{name: 'Details', params: {name: repo.name}}" >{{ repo.name }}</router-link></h3>
              <div class="repolist__item__dates">
                <span class="updated">Last updated: {{ formatDate(repo.updated_at) }}</span>
                <span class="created">Created: {{ formatDate(repo.created_at) }}</span>
              </div>
            </div>
            <p class="info">{{ repo.description }}</p>
            <span class="languages row">{{ repo.language }}</span>
          </li>
        </ul>
        <div class="error" v-if="error">{{ error.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { apiCall, formatDate } from '../composables/GlobalFunctions';
//import { computed } from '@vue/runtime-core';

import UserTools from "../components/UserTools";

export default {
  name: "Home",
  props: ["userData"],
  components:{
    UserTools
  },
  setup(props){
    /*const searchTerm = ref("");
    const sorting = ref("name--asc")*/
    const repos = ref([]);
    const error = ref({});

    const getAllRepos = async () => {
      const { data, errorMsg, loadData } = apiCall(`/users/${props.userData.login}/repos`);

      await loadData();

      repos.value = data.value;
      error.value = errorMsg.value;
    }

    getAllRepos();

    const reorderRepo = (data) => {
      repos.value = data;
      console.log(repos.value);
    }

    /*const searchRepos = computed(() => {
      return repos.value.filter(item => {

        const searchables = ["name", "description", "language"];
        var found = false;

        searchables.forEach(element => {
          if(item[element] !== null && item[element].toLowerCase().includes(searchTerm.value)){
            found = true;
          }
        });

        return found;
      }).sort((a, b) => {
        const selectedOrder = sorting.value.split("--");

        if(selectedOrder[1] == "asc"){
          return ( a[selectedOrder[0]] == b[selectedOrder[0]] ) ? 0 : ( ( a[selectedOrder[0]] > b[selectedOrder[0]] ) ? 1 : -1 );
        } else {
          return ( a[selectedOrder[0]] == b[selectedOrder[0]] ) ? 0 : ( ( a[selectedOrder[0]] < b[selectedOrder[0]] ) ? 1 : -1 );
        }
      });
    });*/

    return{
      props,
      repos,
      error,
      formatDate,
      /*searchTerm,
      searchRepos,
      sorting*/
      reorderRepo
    }
  }
};
</script>

<style lang="scss" scoped>
  .repos{
    display: flex;
    justify-content: space-between;

    &__user{
      width: 33%;

      &__image{
        img{
          max-width: 100%;
          border-radius: 50%;
        }
      }

      &__info{
        padding: 20px 0;
        text-align: left;

        .name{
          line-height: 1.25;
          margin: 0;
        }

        .username{
          margin: 0;
          margin-bottom: 20px;
          font-weight: 300;
          line-height: 24px;
          color: lightgray;
        }

        .bio{
          padding: 20px 0;
        }

        .row{
          margin-bottom: 20px;
          display: block;
        }
      }
    }

    &__content{
      width: calc((100%/3)*2);
      padding: 0 40px;

      /*&__user_tools{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        input{
          width: 75%;
        }

        select{
          width: 20%;
        }
      }*/

      .repolist{
        text-align: left;

        &__item{
          border-bottom: 1px solid lightgray; 
          padding: 20px 0;

          &__header{
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: baseline;

            span{
              display: block;
              text-align: right;

              &.updated{
                font-size: 15px;
              }

              &.created{
                color: lightgrey;
                font-size: 13px;
              }
            }
          }

          h3{
            margin-bottom: 15px;

            a{
              font-weight: bold;

              &:hover{
                text-decoration: underline;
              }
            }
          }

          .info{
            margin-bottom: 15px;
            font-size: 15px;
          }

          .languages{
            color: lightgray;
            font-size: 15px;
          }
        }
      }
    }
  }
</style>