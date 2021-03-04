import axios from "axios";
import { ref } from "vue";

export const apiCall = (call) => {
    const data = ref(null);
    const errorMsg = ref(null);

    const loadData = async () => {
        await axios.get(`https://api.github.com${call}`).then(resp => {
            errorMsg.value = null;
            data.value =  resp.data;
        }).catch(err => {
            errorMsg.value = err;
        });
    }

    return { data, errorMsg, loadData }
}

export const formatDate = (date) => {
    const fullDate = new Date(date);
    return `${fullDate.getFullYear()}-${fullDate.getMonth()+1}-${fullDate.getDate()}`;
}