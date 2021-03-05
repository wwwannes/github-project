<template>
    <div class="loader">
        <div class="loader__icon"></div>
        <div class="loader__text">Loading...</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .loader{
        --color: lightgray;


        &__icon{
            width: 70px;
            height: 70px;
            border-style: solid;
            border-top-color: var(--color);
            border-right-color: var(--color);
            border-left-color: transparent;
            border-bottom-color: transparent;
            border-radius: 50%;
            box-sizing: border-box;
            animation: rotate 3s ease-in-out infinite;
            transform: rotate(-200deg)
        }
    }

    @keyframes rotate {
        0% { border-width: 10px; }
        25% { border-width: 3px; }
        50% { 
            transform: rotate(115deg); 
            border-width: 10px;
        }
        75% { border-width: 3px;}
        100% { border-width: 10px;}
    }
</style>