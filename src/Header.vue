<template lang='pug'>
    header
        h1 Named galaxies
        .search
            i.i-search
            input(
                type='text'
                v-on='listeners'
                placeholder='Search galaxies'
            )
</template>

<script>
    export default {
        computed: {
            listeners () {
                return {
                    input: event => this.$emit('input', event.target.value)
                }
            }
        }
    }
</script>

<style lang='stylus'>
    header
        display flex
        justify-content space-between
        flex-direction column
        position sticky
        top 0
        z-index 1
        background $white
        max-width $xl
        margin 10px auto 0
        padding 12px 0
        &:after
            content ''
            position absolute
            left 0
            right 0
            bottom -15px
            height 15px
            z-index 1
            background linear-gradient(#fff,rgba(255,255,255,.1))
        @media (min-width $lg)
            align-items center
            flex-direction row
            margin auto
            padding 45px 0 10px
        h1
            font 500 34px/40px 'R'
            padding 0 0 15px
    .search
        display flex
        align-items center
        width 271px
        height 36px
        font-size 14px
        padding 0 14px
        color $grey
        transition box-shadow $time
        border 1px solid $devider-grey
        border-radius 4px
        &:hover
            box-shadow 0 1px 6px 0 rgba(0,0,0,.2)
        i
            font-size 16px
        input
            padding 0 0 0 16px
</style>