<template lang='pug'>
    article
        Header(v-model='name')
        .galaxy
            .galaxy__head
                button(@click='sortButton')
                    span Galaxy Name
                    i.i-arrow(class='Fz(10px) Mstart(9px)')
                span Constellation
                span Origin of name
            .galaxy__error(v-if='errored')
                | We're sorry, we're not able to retrieve this information at the moment, please try back later.
            .galaxy__wrap(v-else='')
                .galaxy__load(v-if='loading') Loading...
                ul.galaxy__list(v-else='')
                    li.galaxy__item(v-for='galaxy in filteredList' :key='galaxy.id')
                        .galaxy__itemName
                            figure(class='D(f) Ai(c)')
                                .galaxy__itemNameImg
                                    img(:src='galaxy.img' :alt='galaxy.name' :title='galaxy.name')
                                figcaption {{ galaxy.name }}
                        .galaxy__itemConstellation {{ galaxy.constellation }}
                        .galaxy__itemDesc {{ galaxy.originOfName }}

</template>

<script>
    import Header from './Header'
    import axios from 'axios'

    export default {
        components: {
            Header
        },
        data() {
            return{
                loading: true,
                errored: false,
                sortBy: false,
                name: '',
                galaxies: []
            }
        },
        methods: {
            sortButton() {
                this.sortBy = !this.sortBy
            }
        },
        computed: {
            filteredList () {
                let name = this.name

                if (this.sortBy && name==='') {
                    this.sortBy = false
                    return this.galaxies.reverse()
                } else {
                    return this.galaxies.filter(function (elem) {
                        if (name==='') return true
                        else return elem.name.toLowerCase().indexOf(name.toLowerCase()) > -1
                    })
                }
            }
        },
        created() {
            axios
                .get('https://cors-anywhere.herokuapp.com/' + 'https://test-frontend-api.herokuapp.com/galaxies')
                .then(response => {
                    this.galaxies = response.data
                })
                .catch(error =>
                    this.errored = true
                )
                .finally(() =>
                    this.loading = false
                )
        }
    }
</script>

<style lang='stylus'>
    article
        position relative
        background $white
        border-radius 10px 10px 0 0
        @media (min-width $lg)
            border-radius 10px 0 0 10px
            height 100vh
            overflow auto
    .galaxy
        max-width 1130px
        margin auto
        padding 0 15px 15px
        @media (min-width $lg)
            padding 0 60px 60px
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
            grid-template-columns 27% 19% 54%
    .galaxy__error
        background palevioletred
        border-radius 6px
        padding 20px
        margin 15px 0
        font-weight 500
        color #fff
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
            grid-template-columns 27% 19% 54%
            margin 0
            &:hover
                background rgba(97, 128, 239, 0.2)
    .galaxy__itemNameImg
        width 20px
        height 20px
        margin 0 17px 0 0
        overflow hidden
        font-size 10px
        @media (min-width $lg)
            min-width 30px
            width 30px
            height 30px
            margin 0 22px 0 0
        img
            object-fit cover
            height 100%
            width 100%
    .galaxy__itemName
        padding 7px 10px
        border 1px solid $devider-grey
        &:before
            content 'Galaxy Name'
            padding 0 0 2px
        @media (min-width $lg)
            padding 9px 20px
            border none
    .galaxy__itemConstellation
        &:before
            content 'Constellation'
            padding 0 0 11px
    .galaxy__itemDesc
        &:before
            content 'Origin of name'
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