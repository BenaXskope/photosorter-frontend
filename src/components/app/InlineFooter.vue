<template>
    <div class="flex">
        <div class="accept-btn" :class="{active: activeAC}" id="acbtn" @click.prevent="onSubmit">
            <h5 >Accept  <span class="material-icons">done</span></h5>
        </div>
        <div class="undo-btn" id="undobtn" @click.prevent="onUndo">
            <h5 class="white-text">Undo  <span class="material-icons">undo</span></h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InlineFooter",
        props: ["activeAC"],
        methods: {
            onSubmit() {
                if (this.activeAC)
                {
                    console.log("AC")
                    this.$emit('accept')
                }
            },
            onUndo() {
                console.log("UN")
                this.$emit('undo')
            }
        }
    }
</script>

<style scoped>
    .flex{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    #acbtn {
        padding-bottom: 0.5rem;
        width: 50%;
        text-align: center;
        background-color: #ffffff;
        color: #333333;
        border: 2px solid #333;
    }

    #acbtn.active{
        padding-bottom: 0.5rem;
        background-color: #333333;
        cursor: pointer;
        color: #ffffff;
    }
    #undobtn {
        padding-bottom: 0.5rem;
        background-color: #fc2c38;
        cursor: pointer;
        width: 50%;
        text-align: center;
    }
</style>