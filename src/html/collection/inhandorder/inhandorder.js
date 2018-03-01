import { Vue } from 'js/base'
import './scss/inhandorder.scss'
import inhandorder from './inhandorder.vue'
var inhandorderVue = new Vue({
    el: '#inhandorder',
    data () {
        return {
        }
    },
    template: '<div class="box"><inhandorder></inhandorder></div>',
    components: {
        inhandorder: inhandorder
    }
})
