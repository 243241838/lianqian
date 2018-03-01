import { Vue } from 'js/base'
import './scss/accountlist.scss'
import accountlist from './accountlist.vue'
var detailVue = new Vue({
    el: '#accountlist',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><accountlist></accountlist></div>',
    components: {
        'accountlist': accountlist
    }
})
