import { Vue } from 'js/base'
import './scss/collectionDesk.scss'
import collectionDesk from './collectionDesk.vue'
var collectionDeskVue = new Vue({
    el: '#collectionDesk',
    data () {
        return {
        }
    },
    template: '<div class="box"><collectionDesk></collectionDesk></div>',
    components: {
        'collectionDesk': collectionDesk
    }
})
