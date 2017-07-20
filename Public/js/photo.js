

function load(){

  if(this.width > this.height){
    this.style.width = '200px';
    this.style.height = 'auto';
    this.style.visibility = 'visible';
  }
  else{
    this.style.height = '200px';
    this.style.width = 'auto';
    this.style.visibility = 'visible';
  }
}




const imgs = document.querySelectorAll('.img-box img, .profile img');
imgs.forEach(img => {
  if(!img.complete) {
    img.addEventListener('load', load);
    } else {
    load.call(img);
  }
});
/*imgs.forEach(img => {
 if(img.width > img.height){
    img.style.width = '200px';
    img.style.height = 'auto';
    img.style.visibility = 'visible';
  }
  else{
    img.style.height = '200px';
    img.style.width = 'auto';
    img.style.visibility = 'visible';
  }
});*/




/*$(document).ready(function(){
      $('.img-box img , .profile img').each(function(){
        if($(this).width() > $(this).height()){
          $(this).css({
            width:'200px',
            height: 'auto'
          });
        }
        else {
          $(this).css({
            width:'auto',
            height:'200px'
          });
        }
      });

});
*/
