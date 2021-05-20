<template>
    <div class="flex">

        <router-link to="/">
            <a>
                Picture sorter by Benax
            </a>
        </router-link>


        <div class="switch">
            <label>
                Inline
                <input type="checkbox" v-model="showType">
                <span class="lever"></span>
                Scroll
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data: () => ({
            showType: false
        }),
        watch:{
            showType() {
                this.$emit("switchType")
            }
        }
    }
</script>

<style scoped>
    .flex{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background-color: #333333;
        padding: 5px 0;
    }

    a {
        font-size: 1.5rem;
        color: #ffffff;
    }

    label {
        font-size: 1.5rem;
        color: #ffffff;
    }
    div .switch label input[type=checkbox]:checked+.lever:after,
    div .switch label input[type=checkbox]:checked+.lever{
        background-color: #ffffff;
    }
</style>