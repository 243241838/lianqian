import { Vue } from 'js/base'
import './scss/distributeinfo.scss'
import distributeinfo from './distributeinfo.vue'
var distributeinfoVue = new Vue({
    el: '#distributeinfo',
    data () {
        return {
        }
    },
    template: '<div class="box"><distributeinfo></distributeinfo></div>',
    components: {
        distributeinfo: distributeinfo
    }
})
