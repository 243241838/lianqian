import { Vue } from 'js/base'
import './scss/outboundlist.scss'
import outboundlist from './outboundlist.vue'
var detailVue = new Vue({
    el: '#outboundlist',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><outboundlist></outboundlist></div>',
    components: {
        'outboundlist': outboundlist
    }
})
