<template lang='pug'>
    article
        Header(v-model='name')
        Error(v-if='errored')

        section.galaxy(v-else='')
            .galaxy__head
                button(@click='sortButton' :class='{ sort: reverse }')
                    span European Paintings
                    i.i-arrow(class='Fz(10px) Mstart(9px)')
                span Author Name
                span Description

            .galaxy__wrap
                .galaxy__load(v-if='loading')
                    | Loading...
                ul.galaxy__list(v-else='')
                    li.galaxy__item(v-for='item in filteredList' :key='item.accessionNumber')
                        .galaxy__itemName
                            figure(class='D(f) Ai(c)')
                                .galaxy__itemNameImg(:style='{ background: item.color }')
                                    img(:src='item.image' :alt='item.title' :title='item.title')
                                figcaption {{ item.title }}
                        .galaxy__itemConstellation {{ item.artist }}
                        .galaxy__itemDesc {{ item.description }}
</template>

<script>
    import Header from '@/Header'
    import Error from '@/Error'
    import rgbaster from 'rgbaster'

    export default {
        components: {
            Header,
            Error
        },

        data() {
            return {
                loading: true,
                errored: false,
                reverse: false,
                name: '',
                items: [],
                offset: 0,
                perPage: 20,
                department: 11,
                sortBy: 'TitleDesc',
            }
        },

        created() {
            this.fetchItems()
        },

        methods: {
            fetchItems() {
                const
                    uri = APP_PORT + APP_API_URL + new URLSearchParams({
                        offset: this.offset,
                        perPage: this.perPage,
                        sortBy: this.sortBy,
                        department: this.department,
                    })

                this.axios
                    .get(uri)
                    .then(response => {
                        this.items = response.data.results
                        this.items.forEach(el => this.getMiddleColor(el))
                    })
                    .catch(() => this.errored = true)
                    .finally(() => this.loading = false)
            },
            async getMiddleColor(el) {
                const result = await rgbaster(APP_PORT + el.image, {
                    ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']
                })

                this.$set(el, 'color', result[0].color)
            },
            sortButton() {
                this.reverse = !this.reverse
            },
            searchItems() {
                const name = this.name.toLowerCase()

                return this.items.filter(el =>
                    el.title.toLowerCase().includes(name)
                )
            }
        },

        computed: {
            filteredList() {
                if (this.reverse) {
                    return this.searchItems().reverse()
                }
                return this.searchItems()
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
        > *
            padding 15px 0
        button
            text-align left
            font-weight 700
            color $night-grey
            &:hover
                color $blue
            &.sort
                i
                    transform rotateX(180deg)
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
        width 80px
        height 50px
        margin 5px 7px 5px 0
        overflow hidden
        font-size 10px
        padding 12px
        background $grey
        @media (min-width $lg)
            width 140px
            height 90px
            margin 0 15px 0 0
        img
            object-fit cover
            height 100%
            width 100%

    .galaxy__itemName
        padding 10px
        border 1px solid $devider-grey
        &:before
            content 'European Paintings'
            padding 0 0 2px
        @media (min-width $lg)
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