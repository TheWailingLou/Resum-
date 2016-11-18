$(document).ready(function(){
  $('h1').hover(function(){
    $(this).addClass('item_hover');
  },
  function(){
    $(this).removeClass('item_hover');
  });
});
