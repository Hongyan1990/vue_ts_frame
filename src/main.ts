import Vue from 'vue'

// @ts-ignore
import App from './app.vue'
import './style.css'

new Vue({
	render: h => h(App)
}).$mount('#root')
