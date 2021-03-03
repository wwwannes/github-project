<template>
    <div class="login__container">
        <h2 class="login__title">Search Github repos</h2>
        <div class="login__form">
            <label class="login__form__label">Username</label>
            <input class="login__form__input" type="text" v-model="userName"/>
            <span class="login__form__error" v-if="errorMsg">{{  errorMsg.message }}</span>
            <button class="login__form__btn" @click="getUserInfo">Search for user</button>
        </div>
    </div>
</template>

<script>
//import { apiCall } from '../composables/APIcalls';
import axios from "axios";

export default {
    emits: ["userFound"],
    data(){
        return{
            errorMsg: null,
            userName: null
        }
    },
    methods:{
        async getUserInfo(){
            axios.get(`https://api.github.com/users/${this.userName}`).then(resp => {
                this.errorMsg = '';
                this.$emit('userFound', resp.data) // Make the user data available in App.vue
                console.log(resp)
            }).catch(err => {
                this.errorMsg = err;
            });
        }
        
        /*async getUserInfo(){
            const { data, errorMsg, loadData } = apiCall(`/users/${this.userName}`);

            loadData();

            this.$emit('userFound', data) // Make the user data available in App.vue
            this.errorMsg = errorMsg;
        }*/
        
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

            &__label{
                display: block;
                margin-bottom: 7px;
                font-weight: bold;
            }

            &__input{
                border: 1px solid lightgray;
                border-radius: 6px;
                width: calc(100% - 25px);
                display: block;
                margin-top: 5px;
                margin-bottom: 15px;
                line-height: 25px;
                padding: 5px 12px;
            }

            &__btn{
                margin-top: 20px;
                background: #2ea44f;
                color: white;
                width: 100%;
                display: block;
                padding: 5px 16px;
                font-size: 14px;
                border: none;
                border-radius: 6px;
                line-height: 25px;

                transition: all .7s;

                &:hover{
                    cursor: pointer;
                    background: #2c974b;
                }
            }
        }
    }
</style>