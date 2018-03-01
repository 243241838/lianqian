import { Vue } from 'js/base'
import './scss/projectlist.scss'
import projectlist from './projectlist.vue'
var projectlistVue = new Vue({
    el: '#projectlist',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div class="box"><projectlist></projectlist></div>',
    components: {
        'projectlist': projectlist
    }
})
