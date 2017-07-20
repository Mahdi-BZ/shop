import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { setAuthToken } from '../utils/user'


export function addUser(form){
		return (dispatch)=>{
				if(form.photo == ''){
		  			console.log('photo is empty');
		  			return;
		  		}
		  		const formData = new FormData();
		  		for (var key in form) {
		  			formData.append(key, form[key]);
		  		};
		  		return axios.post('/inscription', formData)
		  	}
}

export function userHandler(token){
		return {
			type: 'USER_HANDLER',
			token: token
		}
	}

export function loginUser(form){
		return (dispatch) =>{
			return axios.post('/login', form).then((res)=>{
				if(!res.data.err){
					localStorage.setItem('token', res.data.token)
					dispatch(userHandler(res.data.token))
				}
				return Promise.resolve(res.data.err); 
			})
  		}
	}

export function itemsHandler(items){
	return {
		type: 'ITEMS_HANDLER',
		items: items
	}
}


export function loadItems(){
	return dispatch => {
		return axios.get('/home').then((res)=>{
			dispatch(itemsHandler(res.data.items))
		});
	}
}	

