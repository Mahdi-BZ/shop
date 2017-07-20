import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/inscription.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import actions from '../actions/actions'

class Inscription extends Component{	

	constructor(props, context){
		super(props, context);
		this.state = {
			form: {
				name: '',
				lastName: '',
				lycee: '',
				photo: '',
				email: '',
				password: ''
			}
		}
	}

	imageHolder(e){
		this.setState({
			form: Object.assign(this.state.form, {
				photo: e.target.files[0]
			})
		})
	}

	inputHandler(e){
		this.setState({
			form: Object.assign(this.state.form, {
				[e.target.name]: e.target.value
			})
		})
	}

	send(){
		this.props.actions.addUser(this.state.form);
		this.props.history.push('/login');
	}


	render(){
		return (
			<section className={styles.inscription}>
		      <div className={styles.container}>
		        <h1>Sign Up Here</h1>	
		          <p className={styles.error}>Please fill all the required boxes</p>
		          <label htmlFor="name">Name:</label>
		          <input type="text" onChange={this.inputHandler.bind(this)} value={this.state.form.name} name='name'/><br/><br/><br/>

		          <label htmlFor="lastName">Last Name:</label>
		          <input type="text" onChange={this.inputHandler.bind(this)} value={this.state.form.lastName} name='lastName'/><br/><br/><br/>

		          <label htmlFor="lycee">lycée:</label>
		          <input type="text" onChange={this.inputHandler.bind(this)} value={this.state.form.lycee} name='lycee'/><br/><br/><br/>

		          <label htmlFor="photo">Your photo:</label>
		          <input type="file" onChange={this.imageHolder.bind(this)} name='photo'/><br/><br/><br/>

		          <label htmlFor="email">Email:</label>
		          <input type="email" onChange={this.inputHandler.bind(this)} value={this.state.form.email} name='email' /><br/><br/><br/>

		          <label htmlFor="password">Password:</label>
		          <input type="password" onChange={this.inputHandler.bind(this)} value={this.state.form.password} name='password'/><br/><br/><br/>

		          <input type="submit" name="submit" value="Sign up" onClick={this.send.bind(this)}/>
		          <p>If you already have an account <Link to='/login'> Log in</Link></p>
		      </div>
		    </section>
		)
	}
}

function mapStateToProps(store){
	return {

	};
}


function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Inscription);