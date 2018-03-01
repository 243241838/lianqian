import { Vue } from 'js/base'
import './scss/detailorder.scss'
import detailorder from './detailorder.vue'
var detailVue = new Vue({
    el: '#detailorder',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><detailorder></detailorder></div>',
    components: {
        'detailorder': detailorder
    }
})
