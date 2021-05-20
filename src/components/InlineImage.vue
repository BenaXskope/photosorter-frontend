<template>
    <div class="mc">

        <img class="material-img" ref="img" :src="getImgUrl(image.imgUrl)">
        <div class="activate-btn">

            <a v-if="image.active" class="waves-effect waves-light active btn modal-trigger"  :href="`#modal${image.id}`" @click.prevent="$emit('choosenPic', image)">
                {{nowrate}}
            </a>
            <a v-else class="waves-effect waves-light inactive btn modal-trigger"  :href="`#modal${image.id}`" @click.prevent>
                {{image.rate.toFixed(2)}}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InlineImage",

        props: {
            image: {
                type: Object
            },
            nowrate: {
                type: Number
            }
        },
        mounted() {
            M.Materialbox.init(this.$refs.img, {})
            console.log(this.$refs.modal)
        },
        methods:{
            getImgUrl(pic) {
                return pic
            }
        }

    }
</script>

<style scoped>
    .mc {
        position: relative;
        padding: 45px 0px 40px;
    }
    img.material-img{
        width: 325px;
    }
    .activate-btn{
        position: absolute;
        width: 100%;
        top: 0px;
    }
    .modal {
        max-height:90%;
        margin: 0;
        align-items: center;
        margin-left: auto;
        max-width: 60%;
        margin-right: auto;
        height: 100%;
    }
    .modal-content {
        max-width: 100%;
    }
    .modal-img {
        max-width: 80%;
        height: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
        width:100%;
    }
    .waves-effect.waves-light.btn.active{
        background-color: #fc2c38;
    }
    .waves-effect.waves-light.btn.inactive{
        background-color: #333333;
    }
    .inactive {
        filter: grayscale(100%);
    }
</style>