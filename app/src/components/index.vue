<template>
  <div>
    <header>
      <div class='logo-box'>
        <img src=".assets/logo.png" class='logo'>
        <h2>CashMania</h2>
        <h3>Online Marketing Magasine</h3>
      </div>
      <div class="profile">
        <div class="profile-box">
          <img :src="'uploads/inscription/'+user.photo" @load='loadImage' />

        </div>
        <div class='titleBox'>
          <h2 v-if=user v-text="user.name + ' ' + user.lastName"></h2>
        </div>
        <a @click.prevent="logout" href="/">Log out</a>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
    </header>
    <section class='menu'>
     <div class="container">
        <div class="box" v-for='category in categories'>
          <router-link :to="category"><img :src="'assets/' + category + '.png'" alt=""></router-link>
          <p v-text='category'></p>
        </div>
        <div class="clearfix"></div>
      </div>
    </section>  
    <router-view></router-view>
  </div>  
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     user: '',
     categories: ['technology', 'games', 'sport', 'books'],
     showWidth: false,
     showHeight: false
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token');
      router.push('/login');
    },
    loadImage(e){
      console.dir(e.target);
      console.log()
      if(e.target.naturalWidth > e.target.naturalHeight){
        e.target.classList += 'showWidth';
      }
      else
        e.target.classList += 'showHeight';
    }
  },
  created(){
    axios.get('/home',{
        headers: {Authorization: 'bearer ' + localStorage.getItem('token')}
    }).then(res=>{
      this.user = res.data.user;
      if(res.data.token){
        localStorage.setItem('token', res.data.token);
      }
    });
  }
}
</script>



<style scoped>

.container{
  width: 1100px;
  margin: 0 auto;
}

.clearfix{
  clear: both;
}

p {
  text-align: right;
  margin-top: 10px;
}

.profile {
  width: 600px;
  float: right;
  text-align: center;
  margin: 0 auto;
  border-right: 1px solid rgba(195,195,195,.5);
}

.profile h2 {
  color: #fff;
  font-size: 20px;
  text-align: center;
  transform: skewX(34deg);
  font-family: 'futura std';
}

.profile-box {
  width: 40%;
  display: -webkit-box;
  -webkit-box-align: center;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(195,195,195,.5);
  overflow: hidden;
  margin: 0 auto;
  margin: 0 10px;
  border-radius: 50%;
  float: right;
}

.profile img {
  visibility: hidden;
}

.profile a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #666666;
  color: #fff;
  text-decoration: none;
  margin-top: 20px;
  margin-left: 50px;
}

.box {
  width: 25%;
  float: left;
}

.box img {
  border-radius: 50%;
  margin-bottom: 10px;
  margin-left: 26%;
  margin-top: 10px;
  width: 128px;
  height: 128px;
}

.box p {
  text-align: center;
  color: #fff;
  font-family: 'futura std';
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0;
}

/*********************************************************************/
section.main {
  margin-top: 100px;
}

section.menu {
  background-color: #F33F3F;
  box-shadow:inset 0px 12px 0px 0px #fff;
  border-top: 10px solid #F33F3F;
  padding-top: 30px;
  padding-bottom: 30px;
}

.addButton {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #F33F3F;
  color: #fff;
  margin-left: 42px;
  font-family: 'futura std';
  font-weight: 600;
}

.items-box {
  width: 90%;
  height: 200px;
  margin: 20px auto 50px auto;
  background-color: #fff;
  padding: 20px 0px 20px 20px;
  border-radius: 5px;
  border: 3px solid #F33F3F;
  position: relative;

}

.img-box {
  display: -webkit-box;
  -webkit-box-pack:center;
  -webkit-box-align:center;
  height: 200px;
  width: 200px;
  overflow: hidden;
  border: 1px solid rgba(195,195,195,.5);
  float: left;
  margin-bottom: 10px;
}

.img-box img {
  visibility: hidden;
  display: block;
  margin: 0 auto;
}

.items-box h1, .items-box h6, .items-box p {
  display: inline-block;
  margin-left: 25px;
  color: #000;
}

.items-box h2 {
  color: #fff;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
  transform: skewX(34deg);
  text-align: center;
  margin-left: 20px;
  font-family: 'futura std';
}

.priceBox {
  background: #F33F3F;
  padding: 10px 5px 10px 7px;
  box-shadow: inset 5px 0px 0px 0px #fff;
  border-left: 10px solid #F33F3F;
  position: relative;
  transform: skewX(-34deg);
  position: absolute;
  bottom: 0;
  right: 14px;
}

.priceBox:after {
  content: ' ';
  position: absolute;
  top: 0;
  right: -33px;
  border-right: 34.2px solid transparent;
  border-bottom: 49px solid #F33F3F;
}

.items-box a {
  float: right;
  margin-bottom: 90%;
  margin-right: 10px;
  background-color: #666666;
  font-size: 17px;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  font-family: 'futura std';
  font-weight: 600;
  position: absolute;
  top: 0;
}

.items-box a:first-of-type {
  right: -10px;
}

.items-box a:last-of-type {
  right: 70px;
}

.items-box h6 {
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 600;
  font-family: 'futura std'
}

.items-box h1 {
  font-size: 30px;
  margin-bottom: 15px;
  font-weight: 600;
}

.items-box p {
  font-size: 16px;
  font-family: 'futura std';
  font-weight: 300;
}

.showHeight{
  height: 200px;
  width: auto;
  visibility: visible !important;
}

.showWidth{
  height: auto;
  width: 200px;
  visibility: visible !important;
}

header {
  background: url('../assets/bg9.png') no-repeat left top;
  background-size: cover;
  height: 205px;
}

.titleBox {
  background-color: #F33F3F;
  color: #fff;
  transform: skewX(-34deg);
  float: left;
  width: 45%;
  border-left: 20px solid #F33F3F;
  box-shadow:inset 12px 0px 0px 0px #fff;
  margin-top: 70px; 
}

.logo {
  float: left;
  width: 150px;
  margin-top: 25px;
  margin-right: -110px;
}

.logo-box {
  float: left;
}

.logo-box h2, .logo-box h3{
  float: right;
  width: 60%;
  text-align: center;
}

.logo-box h2 {
  margin-top: 50px;
  margin-bottom: 0;
  width: 60%;
  text-align: center;
  font-family: 'futura std';
  font-weight: 800;
}

.logo-box h3 {
  margin-top: 6px;
  width: 60%;
  text-align: center;
  font-size: 16px;
  color: #545454;
  font-weight: 600;
  font-family: 'futura std';
}

</style>