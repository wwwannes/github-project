<template>
    <div class="container">
        <div class="breadcrumbs">
            <router-link :to="{name: 'Home'}">{{ route.params.username }}</router-link> /
            <router-link :to="{name: 'Commits', params: {name: route.params.name}}">{{ route.params.name }}</router-link> /
            Files
        </div>
        <div class="files" v-for="file in files" :key="file.sha">
            <div class="files__header">
                <div class="files__header__name">{{ file.filename }}</div>
                <div class="files__header__changes">
                    <span v-if="file.additions" class="addition">+ {{ file.additions }}</span>
                    <span v-if="file.deletions" class="deletions">- {{ file.deletions }}</span>
                </div>
            </div>
            <div class="files__content">
                <ssh-pre language="html" v-if="file.filename.includes('.html')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="js" v-else-if="file.filename.includes('.js')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="php" v-else-if="file.filename.includes('.php')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="json" v-else-if="file.filename.includes('.json')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="xml" v-else-if="file.filename.includes('.xml')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="pug" v-else-if="file.filename.includes('.pug')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre language="css" v-else-if="file.filename.includes('.css')">
                    {{ file.patch }}
                </ssh-pre>
                <ssh-pre v-else>
                    {{ file.patch }}
                </ssh-pre>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';

import SshPre from 'simple-syntax-highlighter';
import 'simple-syntax-highlighter/dist/sshpre.css';

import { apiCall } from '../composables/GlobalFunctions';

export default {
    components:{
        SshPre
    },
    setup(){
        const route = useRoute();
        const files = ref([]);

        console.log(route.params);

        const getDetails = async () => {
            const {data, errorMsg, loadData} = apiCall(`/repos/${route.params.username}/${route.params.name}/commits/${route.params.id}`);
            await loadData();

            files.value = data.value.files;

            console.log(files.value,errorMsg);
        }

        getDetails();

        return{
            route,
            files,
            getDetails,
        }
    }
}
</script>

<style lang="scss" scoped>
    .breadcrumbs{
        text-align: left;
        margin-bottom: 15px;
    }
    .files{
        &__header{
            display: flex;
            justify-content: space-between;
            background: #f1f8ff;
            border: 1px solid #c8e1ff;
            border-bottom: none;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            padding: 15px;
            text-align: left;

            &__name{
                font-weight: bold;
            }

            &__changes{
                .addition,
                .deletions{
                font-size: 14px;
                }

                .addition{
                    color: #21897E;
                }
                .deletions{
                    color: #A10702;
                    margin-left: 20px;
                }
            }
        }

        &__content{
            border: 1px solid lightgrey;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            text-align: left;

            .ssh-pre{
                border: none;
                margin: 0;
            }
        }
    }
</style>