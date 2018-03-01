import { Vue } from 'js/base'
import './scss/blacklist.scss'
import blacklist from './blacklist.vue'
var detailVue = new Vue({
    el: '#blacklist',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><blacklist></blacklist></div>',
    components: {
        'blacklist': blacklist
    }
})
