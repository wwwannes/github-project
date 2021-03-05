<template>
    <div class="login__container">
        <h2 class="login__title">Search Github repos</h2>
        <div class="login__form">
            
            <div v-if="isLoading">Looking for user...</div>

            <label class="login__form__label" v-if="!isLoading">Username</label>
            <input class="login__form__input input" type="text" v-model="userName" v-if="!isLoading"/>
            <span class="login__form__error" v-if="err">{{  err.message }}</span>
            <button class="login__form__btn btn" @click="getUserInfo" v-if="!isLoading">Search for user</button>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { apiCall } from '../composables/GlobalFunctions';

export default {
    emits: ["userFound"],
    setup(props, {emit}){

        const err = ref('');
        const userName = ref('');
        const isLoading = ref(false);

        const getUserInfo = async () => {
            const { data, errorMsg, loadData } = apiCall(`/users/${userName.value}`);

            isLoading.value = true;

            await loadData();

            await emit('userFound', data)
            err.value = errorMsg;

        }

        return{
            err,
            userName,
            isLoading,
            getUserInfo
        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        &__container{
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
        &__title{
            width: 100%;
            margin-bottom: 15px;
            text-align: center;
            font-size: 14px;
        }
        &__form{
            padding: 20px;
            border: 1px solid lightgray;
            border-radius: 5px;
            background: #f6f8fa;

            &__label{
                display: block;
                margin-bottom: 7px;
                font-weight: bold;
            }

            &__btn{
                margin-top: 20px;
                background: #2ea44f;
                width: 100%;
                border: none;

                transition: all .7s;

                &:hover{
                    cursor: pointer;
                    background: #2c974b;
                }
            }
        }
    }
</style>