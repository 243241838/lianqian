import { Vue } from 'js/base'
import './scss/index.scss'
import index from './index.vue'
var indexVue = new Vue({
    el: '#index',
    data () {
        return {
        }
    },
    template: '<div><index></index></div>',
    components: {
        index: index
    }
})
