<template>
    <div class="container">
        <div class="breadcrumbs">
            <router-link :to="{name: 'Home'}">{{ route.params.username }}</router-link> /
            <router-link :to="{name: 'Commits', params: {name: route.params.name}}">{{ route.params.name }}</router-link> /
            Files
        </div>
        <Loader v-if="loadingData && !error"/>
        <div v-if="!loadingData && !error">
            <div class="files" v-for="file in files" :key="file.sha">
                <div class="files__header" @click="toggleContent">
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
                    <img :src="file.raw_url" v-else-if="file.filename.includes('.jpg') || file.filename.includes('.jpeg') || file.filename.includes('.png') || file.filename.includes('.gif')"/>
                    <ssh-pre v-else>
                        {{ file.patch }}
                    </ssh-pre>
                </div>
            </div>
        </div>
        <ErrorMessage v-if="error" :errorMsg="error.message"/>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';

/* https://antoniandre.github.io/simple-syntax-highlighter/ */
import SshPre from 'simple-syntax-highlighter';
import 'simple-syntax-highlighter/dist/sshpre.css';

import { apiCall } from '../composables/GlobalFunctions';
import Loader from "../components/Loader"
import ErrorMessage from "../components/ErrorMessage"

export default {
    components:{
        SshPre,
        Loader,
        ErrorMessage
    },
    setup(){
        const route = useRoute();
        const files = ref([]);
        const loadingData = ref(true);
        const error = ref("");

        const getDetails = async () => {
            const {data, errorMsg, loadData} = apiCall(`/repos/${route.params.username}/${route.params.name}/commits/${route.params.id}`);
            await loadData();

            if(errorMsg.value){
                error.value = errorMsg;
            } else {
                files.value = data.value.files;
                loadingData.value = false;
            }
        }

        getDetails();

        // hide/show content of files
        const toggleContent = (e) => {
            e.currentTarget.nextSibling.classList.toggle("hidden");
            e.currentTarget.classList.toggle("toggled");
        }

        return{
            loadingData,
            error,
            route,
            files,
            getDetails,
            toggleContent
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
        margin-bottom: 30px;

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
            cursor: pointer;

            &__name{
                font-weight: bold;

                &:before{
                    content: "";
                    display: inline-block;
                    width: 0;
                    height: 0;
                    vertical-align: middle;
                    border-top: 4px solid;
                    border-right: 4px solid transparent;
                    border-bottom: 0 solid transparent;
                    border-left: 4px solid transparent;
                    color: lightgray;
                    margin-right: 10px;
                }
            }

            &.toggled{
                .files__header__name{
                    &:before{
                        border-top: 0 solid transparent;
                        border-right: 4px solid transparent;
                        border-bottom: 4px solid;
                        border-left: 4px solid transparent;
                    }
                }
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
            max-height: 300px;
            overflow-y: scroll;

            transition: max-height .75s ease-out;

            &.hidden{
                max-height: 0;
            }

            img{
                max-width: 100%;
                padding: 15px 0;
            }

            .ssh-pre{
                border: none;
                margin: 0;
            }
        }
    }
</style>