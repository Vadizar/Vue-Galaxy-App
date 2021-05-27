<template lang='pug'>
    article
        Header(v-model='name')
        Error(v-if='errored')

        .galaxy(v-else='')
            .galaxy__head
                button(@click='sortButton')
                    span European Paintings
                    i.i-arrow(class='Fz(10px) Mstart(9px)')
                span Author Name
                span Description

            .galaxy__wrap
                .galaxy__load(v-if='loading')
                    | Loading...
                ul.galaxy__list(v-else='')
                    li.galaxy__item(v-for='galaxy in filteredList' :key='galaxy.id')
                        .galaxy__itemName
                            figure(class='D(f) Ai(c)')
                                .galaxy__itemNameImg
                                    img(:src='galaxy.image' :alt='galaxy.title' :title='galaxy.title')
                                figcaption {{ galaxy.title}}
                        .galaxy__itemConstellation {{ galaxy.artist }}
                        .galaxy__itemDesc {{ galaxy.description }}
</template>

<script>
    import Header from '@/Header'
    import Error from '@/Error'

    export default {
        components: {
            Header,
            Error
        },

        data() {
            return {
                loading: true,
                errored: false,
                sortBy: false,
                name: '',
                items: []
            }
        },

        created() {
            this.fetchItems()
        },

        methods: {
            fetchItems() {
                const uri = APP_API_URL + 'offset=0&perPage=20&department=11'
                this.axios
                    .get(uri)
                    .then(response => this.items = response.data.results)
                    .catch(() => this.errored = true)
                    .finally(() => this.loading = false)
            },
            sortButton() {
                this.sortBy = !this.sortBy
            }
        },

        computed: {
            filteredList() {
                const name = this.name

                if (this.sortBy && name === '') {
                    this.sortBy = false
                    return this.items.reverse()
                }
                return this.items.filter(el => {
                    if (name === '') {
                        return true
                    }
                    return el.title.toLowerCase().indexOf(name.toLowerCase()) > -1
                })
            }
        }
    }
</script>

<style lang='stylus'>
    article
        position relative
        background $white
        border-radius 10px 10px 0 0
        padding 0 15px 15px
        @media (min-width $lg)
            border-radius 10px 0 0 10px
            padding 0 60px 60px
            height 100vh
            overflow auto

    .galaxy
        max-width $xl
        margin auto

    .galaxy__head
        display none
        font-size 12px
        line-height 14px
        text-transform uppercase
        letter-spacing 1px
        color $grey
        padding 15px 0
        button
            text-align left
            font-weight 700
            color $night-grey
        @media (min-width $lg)
            display grid
            grid-template-columns 35% 20% 45%

    .galaxy__wrap
        @media (min-width $lg)
            border 1px solid $devider-grey

    .galaxy__load
        padding 7px 10px
        @media (min-width $lg)
            padding 9px 20px

    .galaxy__item
        display grid
        grid-template-columns 100%
        margin 12px 0 24px
        transition background $time
        @media (min-width $lg)
            grid-template-columns 35% 20% 45%
            margin 0
            &:hover
                background rgba(97, 128, 239, 0.2)

    .galaxy__itemNameImg
        flex-shrink 0
        width 30px
        height 30px
        margin 5px 7px 5px 0
        overflow hidden
        font-size 10px
        @media (min-width $lg)
            width 80px
            height 50px
            margin 0 15px 0 0
        img
            object-fit cover
            height 100%
            width 100%

    .galaxy__itemName
        padding 7px 10px
        border 1px solid $devider-grey
        &:before
            content 'European Paintings'
            padding 0 0 2px
        @media (min-width $lg)
            padding 9px 20px
            border none

    .galaxy__itemConstellation
        &:before
            content 'Author Name'
            padding 0 0 11px

    .galaxy__itemDesc
        &:before
            content 'Description'
            padding 0 0 11px

    .galaxy__itemName, .galaxy__itemConstellation, .galaxy__itemDesc
        border-bottom 1px solid $devider-grey
        &:before
            display block
            font-size 10px
            line-height 14px
            letter-spacing 1px
            text-transform uppercase
        @media (min-width $lg)
            display flex
            align-items center
            &:before
                display none

    .galaxy__itemConstellation, .galaxy__itemDesc
        padding 8px 10px 12px
        font-weight 300
        font-size 14px
        line-height 17px
        border-left 1px solid $devider-grey
        border-right 1px solid $devider-grey
        @media (min-width $lg)
            padding 14px 15px
            font-size 16px
            line-height 24px
            border-right none
</style>