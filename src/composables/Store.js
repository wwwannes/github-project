import { reactive } from "vue";

// store for basic state management
export const store = {
    state: reactive({
        userData: [],
        repos: []
    }),
    setUserData(newValue){
        this.state.userData = newValue;
    },
    clearUserData() {
        this.state.userData = [];
    },
    setRepos(newValue){
        this.state.repos = newValue;
    },
    clearRepos() {
        this.state.repos = [];
    },
}