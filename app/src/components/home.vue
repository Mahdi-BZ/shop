<template>
  <section>
  	<button @click='logout'>log out</button>
  	<button @click='time'>time</button>
  </section>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  methods: {
  	logout(){
  		localStorage.removeItem('token');
  		router.push('/login');
  		/*axios.get('/test',{
  			headers: {'Authorization': 'bearer ' + localStorage.getItem('id')}
  		}).then(res=>{
  			if(res.data.token){
  				localStorage.setItem('id', res.data.token);
  			}
  			console.log(localStorage);
  		}).catch(err=>{
  			console.log(err)
  		});*/
  	},
  	time(){
  		axios.get('/time', {
  			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')}
  		}).then(res=> {

  		})
  	}
  }
}
</script>
