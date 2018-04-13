$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      console.log(item);
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $(".delbutton").on('click',function(){
    var x = this.id;
    $.ajax({
      type:"DELETE",
      url:"/todo/delete/"+ x,
      success: function (data) {
        location.reload();
        }
    });
  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
