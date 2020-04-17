<template>
    <div>
        <div class="container">
            <router-link to="/file/image">image</router-link>
            <router-link to="/file/progress">progress</router-link>
        </div>
        <router-view/>
    </div>
</template>
<script>
    export default {
        name: 'file'
    }
</script>
<style lang="stylus">
    .container
        overflow: hidden;
        white-space: nowrap;
        margin-bottom 40px

    a
        color white
        display inline-block
        border-radius 2px
        background-color seagreen
        padding: 2px 6px;

    a + a
        margin-left 4px
</style>
