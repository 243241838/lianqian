import { Vue } from 'js/base'
import './scss/arbitration.scss'
import arbitration from './arbitration.vue'
var detailVue = new Vue({
    el: '#arbitration',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><arbitration></arbitration></div>',
    components: {
        'arbitration': arbitration
    }
})
