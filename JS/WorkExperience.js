$(document).ready(function(){
  $('ul').hide();
  $('h1').hover(function(){
    $(this).addClass('item_hover');
  },
  function(){
    $(this).removeClass('item_hover');
  });

  $('h5').hover(function(){
    $(this).addClass('h5hover');
  },
  function(){
    $(this).removeClass('h5hover');
  });

  var arr=[0,1];

  $('h5').click(function(){
    var $cls = $(this).attr('class');
    $('ul.'+$cls[0]).toggle();
  });


});
