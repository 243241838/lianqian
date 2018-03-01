import { Vue } from 'js/base'
import './scss/unauthorized.scss'
import unauthorized from './unauthorized.vue'
var unauthorizedVue = new Vue({
    el: '#unauthorized',
    data () {
        return {
        }
    },
    template: '<div class="box"><unauthorized></unauthorized></div>',
    components: {
        unauthorized: unauthorized
    }
})
