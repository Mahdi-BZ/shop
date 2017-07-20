import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


export default (homeComponent)=> {
	class authenticationComponent extends Component {

		componentWillMount(){
			if(!this.props.isAuthenticated){
				this.props.history.push('/login');
			}
			else {
				/*this.props.loadItems();*/
			}
		}


		render(){
			return <homeComponent items={this.props.items}/>
		}
	}

	function mapStateToProps(state){
		return {
			isAuthenticated: state.isAuthenticated,
			items : state.items
		};
	}

	function mapDispatchToProps(dispatch){
	return {
		loadItems: bindActionCreators(actions, dispatch)
	}
}

	return connect(mapStateToProps)(authenticationComponent);
}