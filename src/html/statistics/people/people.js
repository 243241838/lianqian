import { Vue } from 'js/base'
import './scss/people.scss'
import people from './people.vue'
var detailVue = new Vue({
    el: '#people',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><people></people></div>',
    components: {
        'people': people
    }
})
