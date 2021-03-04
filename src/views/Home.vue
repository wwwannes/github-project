<template>
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
      <input type="text" v-model="searchTerm" class="input" placeholder="Search for repositories..."/>
      <ul class="repolist" v-if="!error">
        <li class="repolist__item" v-for="repo in searchRepos" :key="repo.id">
          <h3><router-link :to="{name: 'Details', params: {name: repo.name}}" >{{ repo.name }}</router-link></h3>
          <p class="info">{{ repo.description }}</p>
          <span class="languages row">{{ repo.language }}</span>
        </li>
      </ul>
      <div class="error" v-if="error">{{ error.message }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { apiCall } from '../composables/APIcalls';
import { computed } from '@vue/runtime-core';

export default {
  name: "Home",
  props: ["userData"],
  setup(props){
    const searchTerm = ref("");
    const repos = ref([]);
    const error = ref({});

    const getAllRepos = async () => {
      const { data, errorMsg, loadData } = apiCall(`/users/${props.userData.login}/repos`);

      await loadData();

      repos.value = data.value;
      error.value = errorMsg.value;
    }

    getAllRepos();

    const searchRepos = computed(() => {
      return repos.value.filter(item => {

        // Select what repo data to search on
        const searchables = ["name", "description", "language"];
        var found = false;

        searchables.forEach(element => {
          if(item[element] !== null && item[element].toLowerCase().includes(searchTerm.value)){
            found = true;
          }

        });

        return found;
      });
    });


    console.log(searchRepos);

    return{
      props,
      repos,
      error,
      searchTerm,
      searchRepos
    }
  }
};
</script>

<style lang="scss" scoped>
  .repos{
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;

    &__user{
      width: 33%;

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

      .repolist{
        text-align: left;

        &__item{
          border-bottom: 1px solid lightgray; 
          padding: 20px 0;

          h3{
            margin-bottom: 15px;

            a{
              color: #0366d6;
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