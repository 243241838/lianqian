import { Vue } from 'js/base'
import './scss/addstaff.scss'
import addstaff from './addstaff.vue'
var detailVue = new Vue({
    el: '#addstaff',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><addstaff></addstaff></div>',
    components: {
        'addstaff': addstaff
    }
})
