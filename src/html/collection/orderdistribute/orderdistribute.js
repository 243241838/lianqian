import { Vue } from 'js/base'
import './scss/orderdistribute.scss'
import orderdistribute from './orderdistribute.vue'
var orderdistributeVue = new Vue({
    el: '#orderdistribute',
    data () {
        return {
        }
    },
    template: '<div class="box"><orderdistribute></orderdistribute></div>',
    components: {
        orderdistribute: orderdistribute
    }
})
