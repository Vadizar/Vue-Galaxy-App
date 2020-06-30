<template lang='pug'>
    article
        Header(v-model='name')
        section.galaxy
            .galaxy-head
                button(@click='sortButton')
                    span Galaxy Name
                    i.i-arrow(class='Fz(10px) Mstart(9px)')
                span Constellation
                span Origin of name
            .galaxy-wrap
                .galaxy-load(v-if='loading') Loading...
                ul.galaxy-list(v-else='')
                    li.galaxy-item(v-for='galaxy in filteredList' :key='galaxy.id')
                        .galaxy-itemName
                            div(class='D(f) Ai(c)')
                                .galaxy-itemNameImg
                                    img(:src='galaxy.img' :alt='galaxy.name' :title='galaxy.name')
                                p {{ galaxy.name }}
                        .galaxy-itemConstellation {{ galaxy.constellation }}
                        .galaxy-itemDesc {{ galaxy.originOfName }}

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
                sortBy: false,
                name: '',
                galaxies: [],
                errors: []
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
        mounted() {
            axios
                .get('https://cors-anywhere.herokuapp.com/' + 'https://test-frontend-api.herokuapp.com/galaxies')
                .then(response => {
                    this.galaxies = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
                .finally(() =>
                    this.loading = false
                )
        }
    }
</script>

<style lang='stylus'>
    .galaxy
        max-width 1130px
        margin auto
        padding 0 15px 15px
        @media (min-width 1024px)
            padding 0 60px 60px
    .galaxy-head
        display none
        font-size 12px
        line-height 14px
        text-transform uppercase
        letter-spacing 1px
        color $grey
        padding 0 0 15px
        button
            text-align left
            font-weight 700
            color $night-grey
        @media (min-width 1024px)
            display grid
            grid-template-columns 27% 19% 54%
    .galaxy-wrap
        @media (min-width 1024px)
            border 1px solid $devider-grey
    .galaxy-load
        padding 7px 10px
        @media (min-width 1024px)
            padding 9px 20px
    .galaxy-item
        display grid
        grid-template-columns 100%
        margin 24px 0 0
        transition background $time
        @media (min-width 1024px)
            grid-template-columns 27% 19% 54%
            margin 0
            &:hover
                background rgba(97, 128, 239, 0.2)
    .galaxy-itemNameImg
        width 20px
        height 20px
        margin 0 17px 0 0
        overflow hidden
        font-size 10px
        @media (min-width 1024px)
            min-width 30px
            width 30px
            height 30px
            margin 0 22px 0 0
        img
            object-fit cover
            height 100%
            width 100%
    .galaxy-itemName
        padding 7px 10px
        border 1px solid $devider-grey
        &:before
            content 'Galaxy Name'
            padding 0 0 2px
        @media (min-width 1024px)
            padding 9px 20px
            border none
    .galaxy-itemConstellation
        &:before
            content 'Constellation'
            padding 0 0 11px
    .galaxy-itemDesc
        &:before
            content 'Origin of name'
            padding 0 0 11px
    .galaxy-itemName, .galaxy-itemConstellation, .galaxy-itemDesc
        border-bottom 1px solid $devider-grey
        &:before
            display block
            font-size 10px
            line-height 14px
            letter-spacing 1px
            text-transform uppercase
        @media (min-width 1024px)
            display flex
            align-items center
            &:before
                display none
    .galaxy-itemConstellation, .galaxy-itemDesc
        padding 8px 10px 12px
        font-weight 300
        font-size 14px
        line-height 17px
        border-left 1px solid $devider-grey
        border-right 1px solid $devider-grey
        @media (min-width 1024px)
            padding 14px 15px
            font-size 16px
            line-height 24px
            border-right none
</style>