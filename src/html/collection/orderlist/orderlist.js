import { Vue } from 'js/base'
import './scss/orderlist.scss'
import orderlist from './orderlist.vue'
var orderlistVue = new Vue({
    el: '#orderlist',
    data () {
        return {
        }
    },
    template: '<div class="box"><orderlist></orderlist></div>',
    components: {
        orderlist: orderlist
    }
})
