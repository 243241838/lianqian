import { Vue } from 'js/base'
import './scss/overview.scss'
import overview from './overview.vue'
var overviewVue = new Vue({
    el: '#overview',
    data () {
        return {
        }
    },
    template: '<div class="box"><overview></overview></div>',
    components: {
        overview: overview
    }
})
