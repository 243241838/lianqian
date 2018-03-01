import { Vue } from 'js/base'
import './scss/outsourceOrder.scss'
import outsourceOrder from './outsourceOrder.vue'
var outsourceOrderVue = new Vue({
    el: '#outsourceOrder',
    data () {
        return {
        }
    },
    template: '<div class="box"><outsourceOrder></outsourceOrder></div>',
    components: {
        outsourceOrder: outsourceOrder
    }
})
