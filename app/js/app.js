
function getRate(params) {
  var buyTable = "<table class=\"table buyData\"><tbody><tr th scope=\"row\" class=\"currency-name tb-tit\"><td>Currency</td><td>Buy</td></tr>"
  var sellTable = "<table class=\"table sellData\"><tbody><tr th scope=\"row\" class=\"currency-name tb-tit\"><td>Currency</td><td>Sell</td></tr>"
  
  $(".buyData").remove()
  $(".sellData").remove()

  $.ajax({
    type: "GET",
    url: "http://localhost:8181/api/v1/"+params,
    beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
      $('#loader').removeClass('hidden')
    },
    success: function(data) {
      
      $(".bankname").html(`<div class="panel panel-default"><div class="panel-body"><h1><img width="90" style="padding:20px" src="./images/${data.bank}-logo.png" />${data.bank}</h1> Date: ${data.date}</div></div>`)

      $.each( data.buy, function( key, value ){
        buyTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\">"+value+"</td></tr>"
      });

      $.each( data.sell, function( key, value ){
        sellTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\">"+value+"</td></tr>"
      });

      buyTable += "</tbody></table>"
      sellTable += "</tbody></table>"

      $("#buytable").append(buyTable)
      $("#selltable").append(sellTable)
      
    },
    error: function(data) {
      console.log('An error occurred.');
      console.log(data);
    },
    complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
      $('#loader').addClass('hidden')
    },
  });
}
