import { Vue } from 'js/base'
import './scss/abnormalorder.scss'
import abnormalorder from './abnormalorder.vue'
var detailVue = new Vue({
    el: '#abnormalorder',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><abnormalorder></abnormalorder></div>',
    components: {
        'abnormalorder': abnormalorder
    }
})
