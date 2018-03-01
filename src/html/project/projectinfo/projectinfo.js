import { Vue } from 'js/base'
import './scss/projectinfo.scss'
import projectinfo from './projectinfo.vue'
var projectinfoVue = new Vue({
    el: '#projectinfo',
    data () {
        return {
        }
    },
    template: '<div class="box"><projectinfo></projectinfo></div>',
    components: {
        projectinfo: projectinfo
    }
})
