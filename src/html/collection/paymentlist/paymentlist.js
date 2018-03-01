import { Vue } from 'js/base'
import './scss/paymentlist.scss'
import paymentlist from './paymentlist.vue'
var paymentlistVue = new Vue({
    el: '#paymentlist',
    data () {
        return {
        }
    },
    template: '<div class="box"><paymentlist></paymentlist></div>',
    components: {
        paymentlist: paymentlist
    }
})
