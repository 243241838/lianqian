import { Vue } from 'js/base'
import './scss/editproject.scss'
import editproject from './editproject.vue'
var editprojectVue = new Vue({
    el: '#editproject',
    data () {
        return {
        }
    },
    template: '<div class="box"><editproject></editproject></div>',
    components: {
        editproject: editproject
    }
})
