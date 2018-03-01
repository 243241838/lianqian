import { Vue } from 'js/base'
import './scss/territory.scss'
import territory from './territory.vue'
var detailVue = new Vue({
    el: '#territory',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><territorya></territorya></div>',
    components: {
        'territorya': territory
    }
})
