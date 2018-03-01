import { Vue } from 'js/base'
import './scss/service.scss'
import service from './service.vue'
var detailVue = new Vue({
    el: '#service',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><service></service></div>',
    components: {
        'service': service
    }
})
