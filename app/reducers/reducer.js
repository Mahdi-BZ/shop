import jwt from 'jsonwebtoken';

export default (state={}, action)=>{
	switch(action.type){
		case 'USER_HANDLER':
			const user = jwt.decode(action.token)
			axios.defaults.headers.common['Authorization'] = `bearer ${state.token}`;
			return Object.assign({},state, {
				isAuthenticated: true,
				user: user
			}); 
		break;

		case 'ITEMS_HANDLER':
			return Object.assign({}, state, {
				items: action.items
			})
		break;

		default:
			return state
		break;			
	}
}