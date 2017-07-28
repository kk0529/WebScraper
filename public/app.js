$.getJSON('/articles', function(data) {
  for (var i = 0; i<data.length; i++){
    $('#tv').append('<div class="well well-lg"><b><p data-id="' + data[i]._id + '">'+ data[i].title + '</b><br /><a href="'+ data[i].link + '">'+data[i].link+'</a></p></div>');
  }
});


$(document).on('click', 'p', function(){
  $('#notes').empty();
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').append('<h4>' + data.title + '</h4>');
      $('#notes').append('<input id="titleinput" name="title" placeholder = "Comment Title"> <br /><br />');
      $('#notes').append('<textarea id="bodyinput" name="body" placeholder = "Enter Comment Here"></textarea><br />');
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      if(data.note){
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
      }
    });
});

$(document).on('click', '#savenote', function(){
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function( data ) {
      console.log(data);
      $('#notes').empty();
    });


  $('#titleinput').val("");
  $('#bodyinput').val("");
});