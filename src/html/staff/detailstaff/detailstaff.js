import { Vue } from 'js/base'
import './scss/detailstaff.scss'
import detailstaff from './detailstaff.vue'
var detailVue = new Vue({
    el: '#detailstaff',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><detailstaff></detailstaff></div>',
    components: {
        'detailstaff': detailstaff
    }
})
