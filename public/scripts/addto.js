
$(document).ready(function() {

  $(".form1").on("submit", function (event) {  //form submission--- $this referring to the form
    event.preventDefault();
    console.log("the default event result has been prevented");
    ////Validation Error check here

    const food_id = $(this).data('id');
    //req.session.foods_id.push(foods_id);
    //const id = $(this).data('id');
    //req.session.foods_id.push(foods_id);
    console.log('id being pressed here', food_id);
    //console.log('req session foods_ID here is', req.session.foods_id);
    // ///posting teh tweetts
    $.ajax({   //ajax sending serialize data to the tweets route on the actual website.

      url: `/foods/${food_id}`, //acutal server route
      method: 'POST',

      success: function (){
        console.log('submitted');
      }

    })

  });
});
