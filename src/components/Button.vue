<template>
    <button class="btn" @click="$emit('click', $event)">{{title}}</button>
</template>
<style scoped>
    .btn {
        padding: 0;
        border: none;
        font: inherit;
        color: inherit;
        background-color: #1765DE ;
        width: 100%;
        border-radius: 10px;
        display: block;
        color: #FFFFFF;
        min-height: 70px;
        margin-top: 20px;
        font-size: 24px;
        font-weight: 600;
        cursor: pointer;
        outline: none;
    }
    .btn:active {
        transform: translateY(2px);
        transition: .3s;
    }
</style>
<script>
    export default {
        model: {
            event: 'click'
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
    }
</script>