import { Vue } from 'js/base'
import './scss/outsourceDistribute.scss'
import outsourceDistribute from './outsourceDistribute.vue'
var outsourceDistributeVue = new Vue({
    el: '#outsourceDistribute',
    data () {
        return {
        }
    },
    template: '<div class="box"><outsourceDistribute></outsourceDistribute></div>',
    components: {
        outsourceDistribute: outsourceDistribute
    }
})
