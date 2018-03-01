import { Vue } from 'js/base'
import './scss/addproject.scss'
import addproject from './addproject.vue'
var addprojectVue = new Vue({
    el: '#addproject',
    data () {
        return {
            footer: {
                isShow1: false
            }
        }
    },
    template: '<div><addproject></addproject></div>',
    components: {
        'addproject': addproject
    }
})
