import { Vue } from 'js/base'
import './scss/distributeRecord.scss'
import distributeRecord from './distributeRecord.vue'
var distributeRecordVue = new Vue({
    el: '#distributeRecord',
    data () {
        return {
        }
    },
    template: '<div class="box"><distributeRecord></distributeRecord></div>',
    components: {
        distributeRecord: distributeRecord
    }
})
