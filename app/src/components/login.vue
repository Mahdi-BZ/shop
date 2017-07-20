<template>
    <section>
      <p>You don't have an account ?<router-link to="/inscription"> Sign Up</router-link></p>
      <div class="container">
      	  <img src="./assets/user.png" alt="">
			
			<p v-if='err' class="error">{{err}}</p>

          <label for="email">Email:</label>
          <input type="email" v-model="form.email"><br><br><br>

          <label for="password">Password:</label>
          <input type="password" v-model="form.password">
          <input type="submit" @click="send" value="Login" >
      </div>
    </section>
</template>

<script>
export default {
  data () {
    return {
    	form: {
     		email: '',
     		password: ''
     	},
     	err: ''
    }
  },
  methods: {
  	send(){
  		axios.post('/login', this.form).then((res)=>{
  			if(res.data.err){
  				this.err = res.data.message
  			}
  			else {
  				localStorage.setItem('token', res.data.token);
  				router.go('/');
  			}
  		}).catch((err)=>{
  			console.log(err);
  		});
  	}
  }
}
</script>


<style>

body {
  background: url('./assets/bg6.png') no-repeat top center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #000;
}

</style>


<style scoped>

.container {
  width: 300px;
  margin: 0 auto;
}

section p {
  color: #000;
  float: right;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 17px;
  font-family: 'Futura std';
  font-weight: 800;
  position: absolute;
  bottom: 0;
  left: 0;
}

section p a {
  color: #F33F3F;
  text-decoration: none;
}

section img {
  border-radius: 50%;
  margin-left: 28%;
  margin-bottom: 40px;
  margin-top: 150px;
  width: 200px;
  height: 200px;
}

section input[type=email], section input[type=password]  {
  height: 20px;
}

section input[type=submit]{
  border: 0;
  background-color: #F33F3F;
  color: #fff;
  margin-left: 73%;
  width: 70px;
  height: 40px;
  margin-top: 30px;
  font-weight: 600;
  font-size: 17px;
  text-transform: uppercase;
}

section label {
  display: inline-block;
  width: 85px;
  margin-right: 12px;
  color: #000;
  font-size: 18px;
  font-family: 'Futura std';
  font-weight: 800;

}


label.error {
  display: inline-block;
  color: red;
  width: auto;
  font-size: 15px;
  margin-top: 5px;
}

p.error{
  text-align: center;
  margin-bottom: 40px;
  margin-top:0;
  float: none;
  color: red;
  font-size: 18px;
  margin-left: 28%;
}

</style>