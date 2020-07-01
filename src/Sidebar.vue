<template lang='pug'>
    aside
        nav
            router-link(to='/')
                span Main
            router-link(to='/account')
                span Account
</template>

<style lang='stylus'>
    aside
        position sticky
        top 0
        padding 10px 0
        color $white
        @media (min-width $lg)
            padding 38px 0
            height 100vh
            overflow auto
    nav
        a
            display inline-block
            font 700 18px/40px 'R'
            letter-spacing 1px
            padding 0 15px
            margin 8px 0 0 15px
            border-radius 4px
            &:hover, &.active
                background $purple
            @media (min-width $lg)
                display block
                margin 8px 20px
</style>