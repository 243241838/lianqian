import { Vue } from 'js/base'
import './scss/doneorder.scss'
import doneorder from './doneorder.vue'
var doneorderVue = new Vue({
    el: '#doneorder',
    data () {
        return {
        }
    },
    template: '<div class="box"><doneorder></doneorder></div>',
    components: {
        doneorder: doneorder
    }
})
