import { Vue } from 'js/base'
import './scss/editstaff.scss'
import editstaff from './editstaff.vue'
var detailVue = new Vue({
    el: '#editstaff',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><editstaff></editstaff></div>',
    components: {
        'editstaff': editstaff
    }
})
