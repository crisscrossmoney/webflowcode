const parceled = true

//added 'block' to force the button as our trades arent time sensitive
document.getElementById("createOrderButton").style.display = "block";
const apiKey = document.getElementById("apikey");

// Check if there is a saved API key in local storage and set it if so
if (localStorage.getItem("apiKey")) {
  apiKey.value = localStorage.getItem("apiKey");
}

let baseUrl = 'https://router.ptsd.capital/api/'

const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 3
  })
const formatter_usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

// not using right now
function showOrderButton() {
  document.getElementById("createOrderButton").style.display = "block";
  setTimeout(hideOrderButton, 20000);
}
//not using right now
function hideOrderButton() {
  document.getElementById("createOrderButton").style.display = "none";
}

function getPrices() {
  let request = new XMLHttpRequest();
  let ratesUrl = new URL(baseUrl + 'getprivatequote/fiat/');
  // let ratesUrl = new URL(baseUrl + 'getbalances/');
  let url = ratesUrl.toString() + document.getElementById('source-currency').value + '-' + document.getElementById('destination-currency').value + '/';  

  request.open('GET', url, true);
  request.setRequestHeader('apikey', apiKey.value)
  localStorage.setItem("apiKey", apiKey.value);

  request.onload = function() {
    let data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      // update elements on the site with data returned from prices API
      let bestQuote = Math.round((data['cost_rate'])*1000)/1000
      const cost = document.getElementById("costPrice")
      cost.textContent = bestQuote
                  
      //Pulling rev rate from response
      var revRate = Math.round((data['arb_rate'])*1000)/1000
      const revArb = document.getElementById("revArb")
      revArb.value = revRate

	//Competitor pricing
      var retailRate = Math.round((data['rrp'])*1000)/1000
      const retailPrice = document.getElementById("marketRate")
      retailPrice.value = retailRate
      
      //FX pricing
      var spotRate = Math.round((data['fx_ask_price'])*1000)/1000
      const spotPrice = document.getElementById("spotRate")
      spotPrice.textContent = spotRate
      
	//required currency
      var amount = document.getElementById('amount');
      const destination = document.getElementById("destination-currency");
      let sourceRequired = formatter.format((1+(revRate/100)) * spotRate * amount.value);
      const srequired = document.getElementById("sourceRequired")
      srequired.textContent = sourceRequired
      
      // Right side form
      document.getElementById("orderSize").textContent = formatter_usd.format(amount.value)
      document.getElementById("tradeRate").textContent = formatter.format(bestQuote)
      //document.getElementById("clientRate").textContent = formatter.format(retailRate)
      
      // Rev Rate bar graph
      var revMin = parseFloat(document.getElementById("revMin").innerHTML)
      var revMax = parseFloat(document.getElementById("revMax").innerHTML)
      var cssMin = 0
      var cssMax = 100
      var barWidth = (((revRate - revMin) * (cssMax - cssMin)) / (revMax - revMin)) + cssMin
      const revBar = document.getElementById("revBar")
      revBar.style.width = barWidth+"%"
      
      //show order button for 10 seconds
      //showOrderButton()
      getBalances()
    }
  }
  request.send();
}

// BALANCES

function getBalances() {
  let request = new XMLHttpRequest();
  let ratesUrl = new URL(baseUrl + 'getbalances/');
  let url = ratesUrl.toString();
  request.open('GET', url, true);
  request.setRequestHeader('apikey', apiKey.value)
  request.onload = function() {
    let data = JSON.parse(this.response)
    const valrBalance = data['valr'][0]['available']
    const valr = document.getElementById("sourceBalance");
    valr.textContent = formatter.format(valrBalance);
  }
  request.send();
}

// ORDERS

function createOrder() {
  let amount = parseFloat(document.getElementById("amount").value)
  
  let request = new XMLHttpRequest();
  let orderUrl = new URL(baseUrl + 'createorder/');
  let url = orderUrl.toString();
  request.open('POST', url, true);
  request.setRequestHeader('apikey', apiKey.value)
  request.onload = function() {
    if (request.status == 200) {
      alert("Order created")
    } else {
      alert("Order error")
    }
  }
    let wallet = document.getElementById("clientWalletAddress").value
    let tradeNow = JSON.parse(document.getElementById("tradeNow").value)
    let arbTarget = parseFloat(document.getElementById("revArb").value)
    json = {
            "reference": document.getElementById("orderReference").value,
            "from_currency": document.getElementById('source-currency').value,
            "to_currency": document.getElementById('destination-currency').value,
            "want": amount,
            "rate": arbTarget,
            "twofa": document.getElementById("otp").value,
            "trade_now": tradeNow,
            "withdrawal_address": wallet
          }
  
  request.send(JSON.stringify(json))
}

function createOrderArb() {
  let amount = parseFloat(document.getElementById("amount").value)
  
  let request = new XMLHttpRequest();
  let orderUrl = new URL(baseUrl + 'createorder/arb/');
  let url = orderUrl.toString();
  request.open('POST', url, true);
  request.setRequestHeader('apikey', apiKey.value)
  request.onload = function() {
    if (request.status == 200) {
      alert("Order created")
    } else {
      alert("Order error")
    }
  }
    let wallet = document.getElementById("clientWalletAddress").value
    let tradeNow = JSON.parse(document.getElementById("tradeNow").value)
    let arbTarget = parseFloat(document.getElementById("revArb").value)
    json = {
            "reference": document.getElementById("orderReference").value,
            "from_currency": document.getElementById('source-currency').value,
            "to_currency": document.getElementById('destination-currency').value,
            "have": amount,
            "arb_rate": arbTarget,
            "twofa": document.getElementById("otp").value,
            "trade_now": tradeNow,
            "withdrawal_address": wallet
          }
  
  request.send(JSON.stringify(json))
}

function completeOrder() {
  let request = new XMLHttpRequest();
  let orderID = parseFloat(document.getElementById("orderID").value)
  var ratesUrl = new URL(baseUrl + 'trades/setstartnow/' + orderID);
  var url = ratesUrl.toString();
  request.open('POST', url, true)
  request.send()
}

// LISTENERS

//run get prices function from button click
(function updatePrices() {
  const button = document.getElementById("getPricesButton");
  button.addEventListener("click", event => {
    getPrices();
    //getBalances();
  });
  
  const retail = document.getElementById("revArb");
  retail.addEventListener("change", event => {
    console.log(event);
    const arbRate = parseFloat(document.getElementById("revArb").value)
    const spotPrice = parseFloat(document.getElementById("spotRate").textContent)
    if (!isNaN(arbRate)) {
      let amount = parseFloat(document.getElementById('amount').value);
      const sourceRequired = document.getElementById("sourceRequired");
      sourceRequired.textContent = formatter.format((1+(arbRate/100)) * spotPrice * amount);
    }
  });
})();

(function createOrderOnClick() {
  const button = document.getElementById("createOrderButton");
  button.addEventListener("click", event => {
    let amount = parseFloat(document.getElementById("amount").value)
    let reference = document.getElementById("orderReference").value
    
    if (reference.includes("test") || amount > 9) {
        createOrder();
    } else {
      alert("Order size can't be less than $10")
      return
    }
  });
})();

// HELPERS  

function convertFormToJSON(form) {
  var array = $(form).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}

$(document).ready(function(){
    $('#destination-currency').on('change', function() {
        if( $(this).val() === 'usdc' ) {
            $('#clientWalletAddressUSDC').show();
            $('#ercAddress').show();
            $('#clientWalletAddressUSDC').attr('required','required');
            $('#clientWalletAddress').hide();
            $('#trcAddress').hide();
            $('#clientWalletAddress').removeAttr('required');
        } else {
            $('#clientWalletAddressUSDC').hide();
            $('#ercAddress').hide();
            $('#clientWalletAddressUSDC').removeAttr('required');
            $('#clientWalletAddress').show();
            $('#trcAddress').show();
            $('#clientWalletAddress').attr('required','required');
        }
    });
});