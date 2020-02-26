<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <helloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import helloWorld from '@/components/hello-world'

export default {
    name: 'home',
    components: {
        helloWorld
    }
}
</script>
