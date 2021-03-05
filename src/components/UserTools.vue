<template>
    <div class="user_tools">
        <input type="text" v-model="searchTerm" class="input" placeholder="Search for repositories..."/>
        <select v-model="sorting">
          <option value="name--asc">Name Ascending</option>
          <option value="name--desc">Name Descending</option>
          <option value="created_at--asc">Created Ascending</option>
          <option value="created_at--desc">Created Descending</option>
          <option value="updated_at--asc">Updated Ascending</option>
          <option value="updated_at--desc">Updated Descending</option>
        </select>
    </div>

    <!--{{ searchRepos }}--> <!-- Not shown in HTML but needed for this to work ? -->

</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';

export default {
    props: ["data"],
    emits: ["updateList"],
    setup(props, {emit}){
        const searchTerm = ref("");
        const sorting = ref("name--asc");

        const searchRepos = computed(() => {
            console.log('COMPUTED')
            emit('updateList', props.data.filter(item => {

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
            }));
        });

        return{
            searchTerm,
            sorting,
            searchRepos
        }
    }
}
</script>

<style lang="scss" scoped>
    .user_tools{
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
    }
</style>