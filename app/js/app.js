
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
      
      $(".bankname").html(`
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-4">
              <h1><img width="90" style="padding:20px" src="./images/${data.bank}-logo.png" />${data.bank}</h1> Date: ${data.date}
            </div>
            <div class="col-md-8">
            <form class="form-inline">
            
              <div class="form-group">
              Buy: <select class="form-control txn-value"></select>
                <label class="sr-only" for="inputValue">Amount</label>
                <div class="input-group">
                  <input type="number" class="form-control" id="inputValue" placeholder="Amount">
                </div>
              </div>
              
              
            </form>
            <span id="result"></span>
            </div> <!-- /md-8 -->
          </div> 
        </div>
      </div>`)
      var option = "";
      $.each( data.buy, function( key, value ){
        buyTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\"><a href=\"#\">"+value+"</a></td></tr>"
        option += "<option value=\" "+value+"\">"+ key.toUpperCase() +"</option>"
      });

      $.each( data.sell, function( key, value ){
        sellTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\">"+value+"</td></tr>"
      });

      buyTable += "</tbody></table>"
      sellTable += "</tbody></table>"

      $("#buytable").append(buyTable)
      $("#selltable").append(sellTable)
      $(".txn-value").append(option)

      $("#inputValue").keyup(calc);
      $(".txn-value").change(calc);
      
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

;

function calc() {


    let result =  parseFloat($('#inputValue').val(), 10) * parseFloat($(".txn-value").val(), 10);

    let resultStr = isNaN(result) ? 0 : result

    $('#result').html("<h1>"+ resultStr +"<small> MMK</small></h1>");


}




