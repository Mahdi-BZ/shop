const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const secret = 'Iamafuckingcat';


const userSchema = new Schema({
	name : {
	 type : String,
	 required: true
	},
	lastName: {
	 type : String,
	 required: true
	},
	lycee: {
	 type : String,
	 required: true
	},
	email: {
	 type : String,
	 required: true
	},
	password: {
	 type : String,
	 required: true
	},
	photo: {
	 type : String,
	 required: true
	}
	
});

const itemSchema = new Schema({
	title: String,
	description: String,
	price: Number,
	category: String,
	photo: String,
	user: {type: Schema.Types.ObjectId, ref: 'users'}
});


userSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(secret + this.password, bcrypt.genSaltSync(10));
	next();
});

userSchema.methods.compPass = function(pass){
	return bcrypt.compareSync(secret + pass, this.password);
}


const db = {}
db.user = mongoose.model('users', userSchema);
db.item = mongoose.model('items', itemSchema);

module.exports = db;