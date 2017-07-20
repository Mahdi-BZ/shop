<template>
    <section>
      <div class="container">
        <h1>Sign Up Here</h1>
          <p class='error' v-if='err'>Please fill all the required boxes</p>
          <label for="name">Name:</label>
          <input type="text" v-model="form.name"><br><br><br>

          <label for="lastName">Last Name:</label>
          <input type="text" v-model="form.lastName"><br><br><br>

          <label for="lycee">lycée:</label>
          <input type="text" v-model="form.lycee"><br><br><br>

          <label for="photo">Your photo:</label>
          <input type="file" @change="imageHolder"><br><br><br>

          <label for="email">Email:</label>
          <input type="email" v-model="form.email"><br><br><br>

          <label for="password">Password:</label>
          <input type="password" v-model="form.password"><br><br><br>

          <input type="submit" name="submit" value="Sign up" @click='send'>
          <p>If you already have an account <router-link to='/login'> Log in</router-link></p>
        </form>
      </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
    	form : {
    		name: '',
    		lastName: '',
    		lycee: '',
    		email: '',
    		photo: '',
    		email: '',
    		password: ''
    	},
    	err: ''
    }
  },
  methods: {

  	send(){
  		if(this.form.photo == ''){
  			console.log(this.err);
  			this.err = 'enter a photo';
  			return;
  		}
  		const formData = new FormData();
  		for (var key in this.form) {
  			formData.append(key, this.form[key]);
  		};
  		axios.post('/inscription', formData).then((res)=>{
  			if(res.data.err){
  				this.err = res.data.message;
  			}
  			else {
  				router.push('login');
  			}
  		}).catch((err) => {
  			console.log(err);
  		});
  	},
  	imageHolder(e){
  		this.form.photo = e.target.files[0];
  	}
  }
}
</script>

<style src='../assets/inscription.css'></style>