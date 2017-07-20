import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import login from './components/login.vue';
import home from './components/home.vue';
import add from './components/add.vue';
import all from './components/all.vue';
import index from './components/index.vue';
import category from './components/category.vue';
import inscription from './components/inscription.vue';


window.Vue = Vue;
window.axios = axios;

Vue.use(VueRouter);




function auth (to, from, next){
;	axios.post('/logged', {token: localStorage.getItem('token')}).then(res=>{
		if(res.data.logged){
			next();
			return;
		}
		next('/login');
	}).catch(err=>{
		console.log(err);
	});
};

function notauth (to, from, next){
	axios.post('/logged', {token: localStorage.getItem('token')}).then(res=>{
		if(!res.data.logged){
			next();
			return;
		}
		next('/');
	}).catch(err=>{
		console.log(err);
	});
};




const routes = [
	{
		name: 'login',
		path:'/login', 
		component: login,
		beforeEnter: notauth
	},
	{
		name: 'inscription',
		path:'/inscription',
		component: inscription,
		beforeEnter: notauth
	},
	{
		path: '/',
		component: index,
		beforeEnter: auth,
		children: [
			{path: '', component: all},
			{path: ':category', component: category} 
		]
	},
	{
		name: 'add',
		path: '/add',
		component: add,
		beforeEnter: auth
	},
	{
		path:'*',
		redirect: '/login'
	}
];

window.router = new VueRouter({
	routes
});

new Vue({
	el: '#app',
	router
});