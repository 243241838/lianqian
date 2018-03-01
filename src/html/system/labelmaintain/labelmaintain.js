import { Vue } from 'js/base'
import './scss/labelmaintain.scss'
import labelmaintain from './labelmaintain.vue'
var labelmaintainVue = new Vue({
    el: '#labelmaintain',
    data () {
        return {
        }
    },
    template: '<div class="box"><labelmaintain></labelmaintain></div>',
    components: {
        labelmaintain: labelmaintain
    }
})
