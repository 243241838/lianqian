import { Vue } from 'js/base'
import './scss/subsection.scss'
import subsection from './subsection.vue'
var detailVue = new Vue({
    el: '#subsection',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><subsection></subsection></div>',
    components: {
        'subsection': subsection
    }
})
