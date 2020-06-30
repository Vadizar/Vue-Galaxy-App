<template lang='pug'>
    main
        Sidebar
        transition
            router-view
</template>

<style lang='stylus'>
    main
        display grid
        grid-template-rows 70px 1fr
        height 100vh
        @media (min-width 1024px)
            grid-template-rows 1fr 1fr
            grid-template-columns 270px 1fr
    article
        position relative
        @media (min-width 1024px)
            height 100vh
            overflow auto
</style>

<script>
    import Sidebar from './Sidebar'
    import Article from './Article'
    export default {
        components: {
            Sidebar,
            Article
        }
    }
</script>