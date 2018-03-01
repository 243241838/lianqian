import { Vue } from 'js/base'
import './scss/login.scss'
import login from './login.vue'
var loginVue = new Vue({
    el: '#login',
    data () {
        return {
        }
    },
    template: '<div class="box"><login></login></div>',
    components: {
        login: login
    }
})
