<template>
  <div class="container">
        <h1>Sell an item</h1>
        <p v-if='err'class="error">{{err}}</p>
        <input type="text" v-model="form.title" placeholder="Title"><br><br>
        <textarea v-model="form.description" placeholder="Description" rows="8" cols="50"></textarea><br><br>
        <input type="number" v-model="form.price" placeholder="price"> DT<br><br>
        <input type="file" name='photo' @change='changePhoto' placeholder="Photo of your product"><br><br>
        <select v-model="form.category">
          <option value="Choose" hidden="">Choose a Category</option>
          <option value="technology">Technology</option>
          <option value="sport">Sport</option>
          <option value="books">Books</option>
          <option value="games">Games</option>
        </select><br><br>
        <input type="submit" value="Submit" @click='send'>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    	form: {
    		title:'',
    		description: '',
    		price: '',
    		photo: {},
    		category: ''
    	},
    	err: ''
    }
  },
  methods: {
  	send(e){
  		if(this.form.photo == ''){
  			this.err = 'Add a photo please';
  			return;
  		}
  		const formdata = new FormData();
  		for(var key in this.form){
  			formdata.append(key, this.form[key]);
  		}
  		console.log(formdata);
  		axios.post('/item', formdata, {
  			headers: {Authorization: 'bearer ' + localStorage.getItem('token')}
  		}).then(res =>{
  			if(res.data.token){
  				localStorage.setItem('token', res.data.token);
  			}
  			if(res.data.err){
  				this.err = res.data.message;
  				return;
  			}
  			router.push('/');
  			console.log(res.data.message)
  		}).catch(err =>{
  			console.log(err);
  		})
  	},
  	changePhoto(e){
  		this.form.photo = e.target.files[0];
  	}
  }
}
</script>



<style >
body{
  background-color: #e6e6e6;
}

</style>

<style scoped>


.container {
  width: 420px;
  margin: 0 auto;
  margin-top: 200px;
  background-color: #fff;
  padding: 20px 10px;
  padding-left: 40px;

}

h1 {
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
}

input[type=submit] {
  border: 0;
  width: 70px;
  height: 35px;
  background: #4caf50;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
}

input[type=number]{
  width: 70px;
}


</style>