<template>
    <div class="content">
        <p>{{ userName }}</p>
        <item/>
    </div>
</template>

<script>
    import item from '@/components/item'

    export default {
        name: 'app',
        components: {
            item
        },
        data() {
            return {
                userName: '李磊'
            }
        }
    }
</script>

<style scoped>
    .content {
        justify-content: center;
        align-items: center;
    }
</style>
