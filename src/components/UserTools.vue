<template>
  <div class="user_tools">
    <input
      type="text"
      class="input"
      placeholder="Search for repositories..."
      v-model="searchTerm"
    />
    <select v-model="sorting">
      <option value="">Sort by</option>
      <option
        :value="option.value"
        v-for="option in sortOptions"
        :key="option.value"
        >{{ option.name }}</option
      >
    </select>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  props: ["data", "searchables", "sortOptions"],
  emits: ["updateList"],
  setup(props, { emit }) {
    const searchTerm = ref("");
    const sorting = ref("");

    // update data on any change
    watch([searchTerm, sorting], () => {
      emit(
        "updateList",
        props.data
          .filter(item => {
            var found = false;

            props.searchables.forEach(element => {
              if (
                item[element] !== null &&
                item[element].toLowerCase().includes(searchTerm.value)
              ) {
                found = true;
              }
            });

            return found;
          })
          .sort((a, b) => {
            const selectedOrder = sorting.value.split("--");

            if (selectedOrder[1] == "asc") {
              return a[selectedOrder[0]] == b[selectedOrder[0]]
                ? 0
                : a[selectedOrder[0]].toLowerCase() >
                  b[selectedOrder[0]].toLowerCase()
                ? 1
                : -1;
            } else {
              return a[selectedOrder[0]] == b[selectedOrder[0]]
                ? 0
                : a[selectedOrder[0]].toLowerCase() <
                  b[selectedOrder[0]].toLowerCase()
                ? 1
                : -1;
            }
          })
      );
    });

    return {
      searchTerm,
      sorting
    };
  }
};
</script>

<style lang="scss" scoped>
.user_tools {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  input {
    width: 75%;
  }

  select {
    width: 20%;
  }
}
</style>
