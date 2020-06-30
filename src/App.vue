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
        background $blue
        @media (min-width $lg)
            grid-template-rows 1fr 1fr
            grid-template-columns 270px 1fr
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