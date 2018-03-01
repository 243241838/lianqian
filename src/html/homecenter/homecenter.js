import { Vue } from 'js/base'
import './scss/homecenter.scss'
import homecenter from './homecenter.vue'
var detailVue = new Vue({
    el: '#homecenter',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><homecenter></homecenter></div>',
    components: {
        'homecenter': homecenter
    }
})
