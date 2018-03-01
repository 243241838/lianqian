import { Vue } from 'js/base'
import './scss/stafflist.scss'
import stafflist from './stafflist.vue'
var detailVue = new Vue({
    el: '#stafflist',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><stafflist></stafflist></div>',
    components: {
        'stafflist': stafflist
    }
})
