
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
                    <h1><img width="90" style="padding:20px" src="./images/${data.bank}-logo.png" />${data.bank}</h1>
                    Date: ${data.date}
                </div>
                <div class="col-md-8">
                    <div class="col-md-6">
                      <div class="panel panel-default">
                          <div class="panel-heading">Buy</div>
                          <div class="panel-body">
                            <form class="form-inline">
                                <div class="form-group">
                                  <div class="col-md-4">
                                      <select class="form-control buy-txn-value"></select>
                                  </div>
                                  <div class="col-md-8">
                                      <label class="sr-only" for="buyinputValue">Amount</label>
                                      <div class="input-group">
                                        <input type="number" class="form-control" id="buyinputValue" placeholder="Amount">
                                      </div>
                                  </div>
                                </div>
                            </form>
                            <span id="buyResult"></span>
                          </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="panel panel-default">
                          <div class="panel-heading">Sell</div>
                          <div class="panel-body">
                            <form class="form-inline">
                                <div class="form-group">
                                  <div class="col-md-4">
                                      <select class="form-control sell-txn-value"></select>
                                  </div>
                                  <div class="col-md-8">
                                      <label class="sr-only" for="sellinputValue">Amount</label>
                                      <div class="input-group">
                                        <input type="number" class="form-control" id="sellinputValue" placeholder="Amount">
                                      </div>
                                  </div>
                                </div>
                            </form>
                            <span id="sellResult"></span>
                          </div>
                      </div>
                    </div>
                </div>
                <!-- /md-8 -->
              </div>
          </div>
        </div>
      `)
      var optionBuy = "";
      var optionSell = "";
      $.each( data.buy, function( key, value ){
        buyTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\"><a href=\"#\">"+value+"</a></td></tr>"
        optionBuy += "<option value=\" "+value+"\">"+ key.toUpperCase() +"</option>"
      });

      $.each( data.sell, function( key, value ){
        sellTable += "<tr><th scope=\"row\"><figure class=\"currency-icon\"><img src=\"./images/"+key+"-logo.jpg\" /></figure><span>&nbsp;"+ key.toUpperCase()+ "</span></th><td class=\"buyrate\">"+value+"</td></tr>"
        optionSell += "<option value=\" "+value+"\">"+ key.toUpperCase() +"</option>"
      });

      buyTable += "</tbody></table>"
      sellTable += "</tbody></table>"

      $("#buytable").append(buyTable)
      $("#selltable").append(sellTable)

      $(".buy-txn-value").append(optionBuy)
      $(".sell-txn-value").append(optionSell)

      $("#buyinputValue").keyup(buycalc);
      $(".buy-txn-value").change(buycalc);

      $("#sellinputValue").keyup(sellcalc);
      $(".sell-txn-value").change(sellcalc);
      
    },
    error: function(data) {
      console.log('An error occurred.');
      console.log(data);
    },
    complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
      $('#loader').addClass('hidden')
    },
  });
};

function buycalc() {
    let result =  parseFloat($('#buyinputValue').val(), 10) * parseFloat($(".buy-txn-value").val(), 10);

    let resultStr = isNaN(result) ? 0 : result

    $('#buyResult').html("<h1>"+ resultStr +"<small> MMK</small></h1>");
}

function sellcalc() {

  let result =  parseFloat($('#sellinputValue').val(), 10) * parseFloat($(".sell-txn-value").val(), 10);

  let resultStr = isNaN(result) ? 0 : result

  $('#sellResult').html("<h1>"+ resultStr +"<small> MMK</small></h1>");


}




