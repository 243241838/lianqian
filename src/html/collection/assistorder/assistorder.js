import { Vue } from 'js/base'
import './scss/assistorder.scss'
import assistorder from './assistorder.vue'
var assistorderVue = new Vue({
    el: '#assistorder',
    data () {
        return {
        }
    },
    template: '<div class="box"><assistorder></assistorder></div>',
    components: {
        assistorder: assistorder
    }
})
