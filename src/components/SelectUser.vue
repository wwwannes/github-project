<template>
  <div class="login__container">
    <h2 class="login__title">Search Github repos</h2>
    <div class="login__form">
      <Loader v-if="isLoading" />
      <div v-if="!isLoading">
        <label class="login__form__label">Username</label>
        <input
          class="login__form__input input"
          type="text"
          v-model="userName"
        />
        <ErrorMessage v-if="err" :errorMsg="err.response.data.message" />
        <button class="login__form__btn btn" @click="getUserInfo">
          Search for user
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { apiCall } from "../composables/GlobalFunctions";
import { useRouter } from "vue-router";

import { store } from "../composables/Store";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default {
  emits: ["userFound"],
  components: {
    Loader,
    ErrorMessage
  },
  setup(props, { emit }) {
    const err = ref("");
    const userName = ref("");
    const isLoading = ref(false);
    const router = useRouter();

    // always redirect to the homepage when selecting a user
    router.push("/");

    const getUserInfo = async () => {
      if(!store.state.userData || store.state.userData.login != userName.value || store.state.userData.length == 0){
        isLoading.value = true;

        const { data, errorMsg, loadData } = apiCall(`/users/${userName.value}`);

        await loadData();

        isLoading.value = false;
        err.value = errorMsg.value;
        store.setUserData(data.value);
      }

      if(!err.value){
        emit("userFound", true);
      }
    };

    return {
      store,
      err,
      userName,
      isLoading,
      getUserInfo
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  &__container {
    width: 340px;
    padding: 0 16px;
    text-align: left;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  &__title {
    width: 100%;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
  }
  &__form {
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 5px;
    background: #f6f8fa;

    &__label {
      display: block;
      margin-bottom: 7px;
      font-weight: bold;
    }

    &__btn {
      margin-top: 20px;
      background: #2ea44f;
      color: white;
      width: 100%;
      border: none;

      transition: all 0.7s;

      &:hover {
        cursor: pointer;
        background: #2c974b;
      }
    }
  }
}
</style>
