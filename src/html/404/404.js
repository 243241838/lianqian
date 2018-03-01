import { Vue } from 'js/base'
import './scss/404.scss'
import page404 from './404.vue'
var page404Vue = new Vue({
    el: '#page404',
    data () {
        return {
        }
    },
    template: '<div class="box"><page404></page404></div>',
    components: {
        page404: page404
    }
})
