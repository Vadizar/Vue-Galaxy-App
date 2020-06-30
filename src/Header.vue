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
        props: {
            value: {
                type: String,
                default: '',
            }
        },
        computed: {
            listeners () {
                return {
                    ...this.$listeners,
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
        max-width 1130px
        margin auto
        padding 0 15px
        @media (min-width 1024px)
            align-items center
            flex-direction row
            padding 53px 60px 46px
        h1
            font 500 34px/40px 'R'
            padding 17px 0 13px
    .search
        display flex
        align-items center
        width 271px
        height 36px
        font-size 14px
        padding 0 14px
        color $grey
        transition border-color $time
        border 1px solid $devider-grey
        border-radius 4px
        i
            font-size 16px
        input
            padding 0 0 0 16px
        &:hover
            border-color $night-grey
</style>