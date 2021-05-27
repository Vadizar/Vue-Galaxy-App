<template lang='pug'>
    main
        Sidebar
        router-view
</template>

<style lang='stylus'>
    main
        display grid
        grid-template-rows 70px 1fr
        background $blue
        min-height 100%
        @media (min-width $lg)
            grid-template-rows 1fr
            grid-template-columns 270px 1fr
</style>

<script>
    import Sidebar from '@/Sidebar'
    import Article from '#/Article'
    export default {
        components: {
            Sidebar,
            Article
        }
    }
</script>