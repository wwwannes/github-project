<template>
  <div class="container">
    <Loader v-if="isLoading" />
    <div class="repos" v-if="!isLoading">
      <div class="repos__user">
        <div class="repos__user__image">
          <img :src="store.state.userData.avatar_url" :alt="store.state.userData.login" />
        </div>
        <div class="repos__user__info">
          <h2 class="name" v-if="store.state.userData.name">{{ store.state.userData.name }}</h2>
          <h1 class="username row" v-if="store.state.userData.login">
            {{ store.state.userData.login }}
          </h1>
          <p class="bio row" v-if="store.state.userData.bio">{{ store.state.userData.bio }}</p>
          <a :href="store.state.userData.html_url" target="_blank" class="visit btn row"
            >Github page</a
          >
          <span class="followers row"
            >{{ store.state.userData.followers }} followers,
            {{ store.state.userData.following }} following</span
          >
          <ul class="more-info row">
            <li v-if="store.state.userData.company">{{ store.state.userData.company }}</li>
            <li v-if="store.state.userData.location">{{ store.state.userData.location }}</li>
          </ul>
        </div>
      </div>
      <div class="repos__content">
        <UserTools
          :data="reposOriginal"
          :searchables="searchables"
          :sortOptions="sortOptions"
          @updateList="reorderRepo"
        />

        <ul class="repolist" v-if="!error">
          <li class="repolist__item" v-for="repo in repos" :key="repo.id">
            <div class="repolist__item__header">
              <h3>
                <router-link
                  :to="{
                    name: 'Commits',
                    params: {
                      name: repo.name,
                      description: repo.description,
                      language: repo.language
                    }
                  }"
                >
                  {{ repo.name }}
                </router-link>
              </h3>
              <div class="repolist__item__dates">
                <span class="updated"
                  >Last updated: {{ formatDate(repo.updated_at) }}</span
                >
                <span class="created"
                  >Created: {{ formatDate(repo.created_at) }}</span
                >
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
import { ref } from "@vue/reactivity";

import { store } from "../composables/Store";
import { apiCall, formatDate } from "../composables/GlobalFunctions";

import UserTools from "../components/UserTools";
import Loader from "../components/Loader";

export default {
  name: "Home",
  components: {
    UserTools,
    Loader
  },
  setup() {
    const isLoading = ref(true);
    const repos = ref([]);
    const reposOriginal = ref([]);
    const error = ref({});
    const searchables = ["name", "description", "language"];
    const sortOptions = [
      { value: "name--asc", name: "Name Ascending" },
      { value: "name--desc", name: "Name Descending" },
      { value: "created_at--asc", name: "Created Ascending" },
      { value: "created_at--desc", name: "Created Descending" },
      { value: "updated_at--asc", name: "Updated Ascending" },
      { value: "updated_at--desc", name: "Updated Descending" }
    ];

    console.log(store.state.userData.login)

    const getAllRepos = async () => {
      if(store.state.repos.length == 0){
        const { data, errorMsg, loadData } = apiCall(
          `/users/${store.state.userData.login}/repos`
        );

        await loadData();

        repos.value = reposOriginal.value = data.value; /* Have a different for searching and filtering */
        error.value = errorMsg.value;
        isLoading.value = false;
        store.setRepos(repos.value);
      } else {
        error.value = null;
        isLoading.value = false;
        repos.value = reposOriginal.value = store.state.repos;
      }
    };
    
    getAllRepos();
    

    const reorderRepo = data => {
      repos.value = data;
    };

    return {
      isLoading,
      store,
      repos,
      error,
      formatDate,
      searchables,
      sortOptions,
      reorderRepo,
      reposOriginal
    };
  }
};
</script>

<style lang="scss" scoped>
.repos {
  display: flex;
  justify-content: space-between;

  &__user {
    width: 33%;

    &__image {
      img {
        max-width: 100%;
        border-radius: 50%;
      }
    }

    &__info {
      padding: 20px 0;
      text-align: left;

      .name {
        line-height: 1.25;
        margin: 0;
      }

      .username {
        margin: 0;
        margin-bottom: 20px;
        font-weight: 300;
        line-height: 24px;
        color: lightgray;
      }

      .bio {
        padding: 20px 0;
      }

      .row {
        margin-bottom: 20px;
        display: block;
      }
    }
  }

  &__content {
    width: calc((100% / 3) * 2);
    padding: 0 40px;
    .repolist {
      text-align: left;

      &__item {
        border-bottom: 1px solid lightgray;
        padding: 20px 0;

        &__header {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 15px;

          span {
            display: block;
            text-align: right;

            &.updated {
              font-size: 15px;
            }

            &.created {
              color: lightgrey;
              font-size: 13px;
            }
          }
        }

        h3 {
          margin-bottom: 15px;

          a {
            font-weight: bold;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        .info {
          margin-bottom: 15px;
          font-size: 15px;
        }

        .languages {
          color: lightgray;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
