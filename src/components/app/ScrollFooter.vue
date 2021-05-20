<template>
    <div class="flex">
        <div class="rates__list" v-if="nowrate>=-1">
            <div
                    class="rate"
                    :class="{active: image.active, inactive: !image.active}"
                    v-for="(image, num) of images"
                    :key="image.id"
            >
                <div class="rates__list__inner" @click.prevent="$emit('choosenPic', image)">
                    <div class="number-rate" :class="{active: image.active, inactive: !image.active}"

                    >
                        №{{num+1}} : {{!image.active?image.rate.toFixed(2):nowrate.toFixed(2)}}
                    </div>
                </div>
            </div>

        </div>
        <div v-else class="accept__btn" id="acbtn" @click.prevent="onSubmit">
            <div class="accept__btn-text" >Accept</div>
        </div>
        <div class="undo__btn" id="undobtn" @click.prevent="onUndo">
            <div class="undo__btn-text">Undo</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InlineFooter",
        props: {
            activeAC: {
                type: Boolean
            },
            images: {
                type: Array
            },
            nowrate: {
                type: Number
            }
        },
        methods: {
            onSubmit() {
                this.$emit('accept')
            },
            onUndo() {
                this.$emit('undo')
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }
    .flex{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
    }
    .rates__list{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }
    .rate{
        width: 100%;
        height:100%;
        line-height:50px;
    }
    .active + .active{
        border-left: 4px solid #333;
    }
    .rate.inactive + .rate.inactive{
        border-left: 4px solid #fff;
    }
    .fbtn {
        text-align: center;
        margin: 0;
    }

    #acbtn {
        width: 100%;
        height: 50px;
        line-height: 46px;
        padding-left: 22px;
        font-size: 24px;
        color:#fff;
        background-color: #333333;
        cursor: pointer;
        text-align: center
    }
    .accept__btn-text::after{
        content:"\f00c";
        font-family: "icomoon";
        margin-left: 10px;
        font-size: 20px;
    }
    #undobtn {
        font-size: 24px;
        color: #fff;
        background-color: #fc2c38;
        cursor: pointer;
        width: 100%;
        height: 50px;
        line-height: 46px;
        padding-left: 20px;
        text-align: center;
    }
    .undo__btn-text::after{
        content:"\f0e2";
        font-family: "icomoon";
        margin-left: 10px;
        font-size: 20px;
    }
    .number{
        color: #333333;
        display: inline-block;
        width: 50%;
        float: left;
        background-color: #e3e3e3;
    }
    .number-rate{
        display: inline-block;
        width: 100%;
    }
    .number-rate.active{
        background-color: #e3e3e3;
    }
    .number-rate.inactive{
        background-color: #333333;
        color: #fff;
    }
    .rates__list__inner{
        font-size: 16px;
        cursor: pointer;
    }
</style>