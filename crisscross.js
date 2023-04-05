const parceled = true

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

function getPricesArb() {
  let request = new XMLHttpRequest();
  let ratesUrl = new URL(baseUrl + 'getprivatequote/arb/');
  let url = ratesUrl.toString() + document.getElementById('source-currency').value + '-' + document.getElementById('destination-currency').value + '/';

  request.open('GET', url, true);
  request.setRequestHeader('apikey', apiKey.value);
  localStorage.setItem("apiKey", apiKey.value);

  request.onload = function() {
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      // Update elements on the site with data returned from prices API for getPricesArb
      let tradeRateArbValue = Math.round(data['cost_rate'] * 1000) / 1000;
      const tradeRateArb = document.getElementById("tradeRateArb");
      tradeRateArb.value = tradeRateArbValue;

      let rrpArbValue = Math.round(data['rrp'] * 1000) / 1000;
      const rrpArb = document.getElementById("rrpArb");
      rrpArb.value = rrpArbValue;
      
      // Update rev bar
      var revMin = parseFloat(document.getElementById("revMin").innerHTML);
      var revMax = parseFloat(document.getElementById("revMax").innerHTML);
      var cssMin = 0;
      var cssMax = 100;
      var barWidth = (((tradeRateArbValue - revMin) * (cssMax - cssMin)) / (revMax - revMin)) + cssMin;
      const revBar = document.getElementById("revBar");
      revBar.style.width = barWidth + "%";
    }
  }
  request.send();
}

function getPricesFiat() {
  let request = new XMLHttpRequest();
  let ratesUrl = new URL(baseUrl + 'getprivatequote/fiat/');
  let url = ratesUrl.toString() + document.getElementById('source-currency').value + '-' + document.getElementById('destination-currency').value + '/';

  request.open('GET', url, true);
  request.setRequestHeader('apikey', apiKey.value);
  localStorage.setItem("apiKey", apiKey.value);

  request.onload = function() {
    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      // Update elements on the site with data returned from prices API for getPricesFiat
      let tradeRateFiatValue = Math.round(data['cost_rate'] * 1000) / 1000;
      const tradeRateFiat = document.getElementById("tradeRateFiat");
      tradeRateFiat.value = tradeRateFiatValue;

      let rrpFiatValue = Math.round(data['rrp'] * 1000) / 1000;
      const rrpFiat = document.getElementById("rrpFiat");
      rrpFiat.value = rrpFiatValue;
      
      let spotRateValue = Math.round(data['fx_ask_price'] * 1000) / 1000;
      const spotRate = document.getElementById("spotRate");
      spotRate.textContent = spotRateValue;
      
      // Update Right Side Form
      document.getElementById("orderSize").textContent = formatter_usd.format(wantAmount.value);
      document.getElementById("targetRate").textContent = formatter.format(rrpFiatValue);
      updateSourceRequired();
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
  let have = parseFloat(document.getElementById("wantAmount").value)
  
  let request = new XMLHttpRequest();
  let orderUrl = new URL(baseUrl + 'createorder/fiat');
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
    let rateTarget = parseFloat(document.getElementById("tradeRateFiat").value)
    let clientTateTarget = parseFloat(document.getElementById("rrpFiat").value)

    json = {
            "reference": document.getElementById("orderReference").value,
            "from_currency": document.getElementById('source-currency').value,
            "to_currency": document.getElementById('destination-currency').value,
            "wantAmount": have,
            "trade_rate": rateTarget,
            "rate": clientTateTarget,
            "twofa": document.getElementById("otp").value,
            "trade_now": tradeNow,
            "withdrawal_address": wallet
          }
  
  request.send(JSON.stringify(json))
}

function createOrderArb() {
  let have = parseFloat(document.getElementById("haveAmount").value)
  
  let request = new XMLHttpRequest();
  let orderUrl = new URL(baseUrl + 'createorder/arb');
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
    let arbTarget = parseFloat(document.getElementById("tradeRateArb").value)
    let clientArbRate = parseFloat(document.getElementById("rrpArb").value)
    json = {
            "reference": document.getElementById("orderReference").value,
            "from_currency": document.getElementById('source-currency').value,
            "to_currency": document.getElementById('destination-currency').value,
            "have": have,
            "trade_rate": arbTarget,
            "rate": clientArbRate,
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
    getPricesArb();
    getPricesFiat();
    getBalances();
  });
})();

// Updates the source currency required when either its changed by user or prgramatically

function updateSourceRequired() {
  const rrpFiatValue = parseFloat(document.getElementById("rrpFiat").value);
  const wantAmountValue = parseFloat(document.getElementById("wantAmount").value);
  const haveAmountValue = parseFloat(document.getElementById("haveAmount").value);

  const sourceRequired = document.getElementById("sourceRequired");

  if (!isNaN(rrpFiatValue)) {
    if (!isNaN(wantAmountValue)) {
      sourceRequired.textContent = formatter.format(rrpFiatValue * wantAmountValue);
    } else if (!isNaN(haveAmountValue)) {
      sourceRequired.textContent = formatter.format(haveAmountValue);
    }
  }
}
const rrpFiatElement = document.getElementById("rrpFiat");
rrpFiatElement.addEventListener("change", event => {
  updateSourceRequired();
});
const wantAmountElement = document.getElementById("wantAmount");
wantAmountElement.addEventListener("change", event => {
  updateSourceRequired();
});

// Create Fiat order  
(function createOrderOnClick() {
  const button = document.getElementById("createOrderButtonFiat");
  button.addEventListener("click", event => {
    let have = parseFloat(document.getElementById("haveAmount").value)
    let reference = document.getElementById("orderReference").value
    
    if (reference.includes("test") || have > 9) {
        createOrder();
    } else {
      alert("Order size can't be less than $10")
      return
    }
  });
})();

// Create Arb order  
(function createOrderOnClickArb() {
  const button = document.getElementById("createOrderButtonArb");
  button.addEventListener("click", event => {
    let want = parseFloat(document.getElementById("wantAmount").value);
    let reference = document.getElementById("orderReference").value;

    if (reference.includes("test") || want > 9) {
      createOrderArb();
    } else {
      alert("Order size can't be less than $10");
      return;
    }
  });
})();

// HELPERS  

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