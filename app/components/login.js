import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles/login.css'
import * as actions from '../actions/actions'

class Login extends Component {

	constructor(props, context){
		super(props, context);
		this.state = {
			form: {
				email: '',
				password: ''
			}
		}
	}

	inputHandler(e){
		this.setState({
			form: Object.assign(this.state.form, {
				[e.target.name]: e.target.value
			})
		})
	}

	loginHandler(){
		this.props.actions.loginUser(this.state.form).then((err)=>{
			if(err){
				console.log('login error');
			}
			else {
				this.props.history.push('/');
			}
		});
	}

	render(){
		return (
			<section className={styles.login}>
		      <p>You don't have an account ?<Link to="/inscription"> Sign Up</Link></p>
		      <div className={styles.container}>
		      	  <img src="./assets/user.png" alt="" />
					

		          <label htmlFor="email">Email:</label>
		          <input type="email" value={this.state.form.email} onChange={this.inputHandler.bind(this)} name='email' /><br/><br/><br/>

		          <label htmlFor="password">Password:</label>
		          <input type="password" value={this.state.form.password} onChange={this.inputHandler.bind(this)} name='password' />
		          <input type="submit" value="Login" onClick={this.loginHandler.bind(this)}/>
		      </div>
		    </section>
    	)
	}
}



function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(null, mapDispatchToProps)(Login);