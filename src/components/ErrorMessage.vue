<template>
    <div class="error" v-if="errorMsg">{{ errorMsg.response.data.message }}</div>
</template>

<script>
export default {
    props:["errorMsg"]
}
</script>

<style lang="scss" scoped>
    .error{
        text-align: center;
        border: 1px solid #A10702;
        background: #e07571;
        color: white;
        padding: 7px 15px;
        font-size: 13px;
        font-style: italic;
        width: 80%;
        margin: 0 auto;
    }
</style>