<template>
    <input type="text" v-model="userName"/>
    <p v-if="errorMsg">{{  errorMsg.message }}</p>
    <br/>
    <button @click="getUserInfo">Search for user</button>
</template>

<script>
import axios from "axios";

export default {
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
                this.$emit('userFound', resp.data) /* Make the user data available in App.vue */
            }).catch(err => {
                this.errorMsg = err;
            });
        }
    }
}
</script>