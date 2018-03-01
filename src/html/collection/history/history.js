import { Vue } from 'js/base'
import './scss/history.scss'
import history from './history.vue'
var historyVue = new Vue({
    el: '#history',
    data () {
        return {
        }
    },
    template: '<div class="box"><history></history></div>',
    components: {
        history: history
    }
})
