<template>
  <section class='main'>
        <div class="container">
          <router-link to='add' class='addButton'>+ Create an offer</router-link>
          <div class="items-box" v-if='items' v-for='item in items'>
            <div class="img-box">
              <img :src="'src/uploads/item/' + item.photo" alt="" @load='loadImage' />
            </div>
            <h6 v-text="item.user.name + ' ' + item.user.lastName"></h6><br>
            <h1 v-text="item.title"></h1><br>
            <p v-text="item.description"></p>
            <a href="#">Buy</a>
            <a href="#">?</a>
            <div class='priceBox'>
              <h2 class="price" v-text='item.price + "DT"'></h2>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
     items: []
    }
  },
  methods: {
    loadImage(e){
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
      this.items = res.data.items;
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
section.main {
  margin-top: 50px;
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
</style>