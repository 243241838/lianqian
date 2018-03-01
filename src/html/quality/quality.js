import { Vue } from 'js/base'
import './scss/quality.scss'
import quality from './quality.vue'
var detailVue = new Vue({
    el: '#quality',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><quality></quality></div>',
    components: {
        'quality': quality
    }
})
