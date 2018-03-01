import { Vue } from 'js/base'
import './scss/500.scss'
import page500 from './500.vue'
var page500Vue = new Vue({
    el: '#page500',
    data () {
        return {
        }
    },
    template: '<div class="box"><page500></page500></div>',
    components: {
        page500: page500
    }
})
