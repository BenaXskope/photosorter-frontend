<template>
    <div>
        <div class="header__nav">
            <router-link to="/">
                <a>
                    Picture sorter by Benax
                </a>
            </router-link>
        </div>


        <ul class="directories" :key="updcnt">

            <router-link
                    v-for="dir in directories"
                    :key="dir.id"
                    tag="li"
                    active-class="active"
                    class="directories__item"
                    :to="dir.dir_name"
            >
                <div class="flex">
                    <div class="directories__item-name">{{dir.dir_name}}</div>
                    <div class="directories__item-progress">Sorting progress: {{ Math.floor(100*dir.edges/dir.full_edges)}}%</div>
                    <div class="directories__item-btn" @click.prevent="updateDir(dir)">Update</div>

                </div>
            </router-link>
            <li class="directory__add-btn" v-if="!adding" @click.prevent="adding=!adding">
                +
            </li>

            <li class="directory__add-btn" v-if="adding" @click.prevent="adding=!adding">
                -
            </li>
            <li class="directory__add__form"  v-if="adding">
                <div class="directory__add__form-inner">
                    <input type="text" class="directory__add__form-input" v-model="add_path">
                    <div class="directory__add__form-btn" @click.prevent="addDir">Add</div>
                </div>
            </li>
<!--    TODO: AddDirectory с валидацией после ответа сервера        -->
        </ul>


    </div>
</template>

<script>
    import messages from "../utils/messages"

    export default {
        name: 'Directories',
        components: {
        },
        data: () => ({
            updcnt: false,
            adding: false,
            add_path: null
        }),
        computed: {
            directories() {
                return (this.$store.getters.directories)
            }
        },
        async mounted() {
            if (!Object.keys(this.$store.getters.directories).length) {
                await this.$store.dispatch('getDirectories')
            }
        },
        methods: {
            async addDir() {
                let resp = await this.$store.dispatch('addDirectory', this.add_path)
                .then(resp => {
                    if (resp === 'ok') {
                        this.$message(messages['Directory_added'])
                        this.adding = false
                        this.add_path = null
                    }
                    else {
                        this.$error(messages[resp])
                    }
                })
            },
            async updateDir(directory) {
                let rest = await this.$store.dispatch('updateDirectory', directory.id)
                .then(response =>{
                    this.updcnt = !this.updcnt
                    this.$message(messages['Directory_updated'])
                })
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }
    .header__nav{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background-color: #333333;
        font-size: 1.5rem;
        height: 50px;

    }
    .header__nav a{
        text-decoration: none;
        color: #ffffff;
    }
    ul{
        margin: 20px 50px;
    }
    .flex{
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
    }
    li {
        display: block;
        border: 3px solid #fc2c38;
        border-radius: 5px;
        padding: 0 30px;
        line-height:42px;
        min-height: 50px;
        text-align: left;
        font-size: 28px;
        cursor: pointer;
    }
    li div.directories__item-name::before {
        content: "\e900";
        font-family: "icomoon";
        position: absolute;
        text-align: center;
        left:-20px;
        top: 2px;
        font-size:32px;
    }
    li div.directories__item-name{
        /*display: inline-block;*/
        padding-left: 20px;
        color: #333333;
        position: relative;
    }
    li + li{
        margin-top: 20px;
    }
    .directories__item-btn{
        border-radius: 5px;
        border: 2px solid #333333;
        font-size: 24px;
        font-weight: 500;
        height: 34px;
        line-height: 25px;
        padding: 0 5px 0 30px;
        color: #333333;
        margin-top:3px;
        position: relative;
    }
    .directories__item-btn::before{
        content:"\f0e2";
        font-family: "icomoon";
        font-size: 20px;
        position: absolute;
        top:2px;
        left:7px;
    }
    li.directory__add-btn{
        display: inline-block;
        margin-left: 50vw;
        transform: translateX(-100%);
        width: 50px;
        height: 50px;
        padding: 0;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #fc2c38;
        font-size:48px;
        line-height: 32px;
        cursor: pointer;
    }
    .directory__add__form-inner{
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    input[type=text].directory__add__form-input{
        border-bottom: 1px solid #333333;
        border-radius: 0;
        width: 100%;
        font-size: 24px;
        height: 45px;
        margin: 0 20px 5px 20px;
        position: relative;
    }
    input[type=text].directory__add__form-input:focus:not(.browser-default){
        border-bottom: 1px solid #333333;
        box-shadow: 0 1px 0 0 #333333;
    }
    .directory__add__form-inner::before{
        content:"+";
        position: absolute;
        left: -20px;
        text-align: center;
        top: 10px;
        color: #fff;
        background-color: #333;
        height: 30px;
        line-height:24px;
        width: 30px;
        border-radius: 50%;
    }
    .directory__add__form-btn{
        border-radius: 5px;
        border: 2px solid #333333;
        font-size: 24px;
        font-weight: 500;
        height: 34px;
        line-height: 26px;
        padding: 0 5px;
        color: #333333;
        margin-top:10px;
        position: relative;
    }
</style>
