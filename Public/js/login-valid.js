$(function() {
  $('form').validate({
    rules:{
      email: {
        required: true,
        email:true
      },
      password: 'required'
    },
    messages:{
      email: 'Please enter a valid email address',
      password: 'Please provide a password'
    },
    submitHandler: function(form){
      form.submit();
    }
  });
});
