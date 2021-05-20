<template>
    <div class="mc">
        <div class="number">
            {{number+1}}
        </div>
        <img class="material-img" ref="img" :src="getImgUrl(image.imgUrl)">
    </div>
</template>

<script>
    export default {
        name: "ScrollImage",

        props: {
            image: {
                type: Object
            },
            number: {
                type: Number
            }
        },
        mounted() {
            M.Materialbox.init(this.$refs.img, {})
            console.log(this.image)
            console.log(this.$refs.modal)
        },
        methods:{
            onClick(img) {
                console.log(img.imgUrl)
            },
            getImgUrl(pic) {
                return pic
            }
        }

    }
</script>

<style scoped>
    .mc {
        border-bottom: 5px solid #e0e0e0;
        position: relative;
    }
    img.material-img{
        width: 90vw;
    }
    .number{
        position: absolute;
        top: 2vw;
        left: 2vw;
        width: 30px;
        height: 30px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        line-height:22px;
        background-color: #333;
        border: 2px solid #333;
    }
</style>