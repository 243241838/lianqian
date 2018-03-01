import { Vue } from 'js/base'
import './scss/outboundConfiguration.scss'
import outboundConfiguration from './outboundConfiguration.vue'
var outboundConfigurationVue = new Vue({
    el: '#outboundConfiguration',
    data () {
        return {
        }
    },
    template: '<div class="box"><outboundConfiguration></outboundConfiguration></div>',
    components: {
        outboundConfiguration: outboundConfiguration
    }
})
