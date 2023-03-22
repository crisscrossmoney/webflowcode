const submitBtn = document.getElementById("submit-btn");
const refreshBtn = document.getElementById("refresh-btn");
const amountInput = document.getElementById("amount");
const costInput = document.getElementById("cost");
const retailInput = document.getElementById("retail");
const peer1Input = document.getElementById("peer1");
const peer2Input = document.getElementById("peer2");
const apiKeyInput = document.getElementById("apikey");
const responseMessage = document.getElementById("response-message");

// Check if there is a saved API key in local storage and set it if so
if (localStorage.getItem("apiKey")) {
  apiKeyInput.value = localStorage.getItem("apiKey");
}

submitBtn.addEventListener("click", () => {
  if (!amountInput || !costInput || !retailInput || !apiKeyInput) {
    console.error("One of the input elements does not exist in the HTML.");
    return;
  }

  const data = {
    amount: parseInt(amountInput.value),
    cost: parseFloat(costInput.value),
    retail: parseFloat(retailInput.value),
    peer1: peer1Input.value || peer1Input.placeholder,
    peer2: peer2Input.value || peer2Input.placeholder
  };

  // Save the API key to local storage
  localStorage.setItem("apiKey", apiKeyInput.value);

  submitBtn.style.display = "none";

  fetch("https://router.ptsd.capital/api/p2p/createorder/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": apiKeyInput.value
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(response => {
      responseMessage.innerHTML = "Success";
      setTimeout(() => {
        amountInput.value = "";
        costInput.value = "";
        retailInput.value = "";
        peer1Input.value = "";
        peer2Input.value = "";
        responseMessage.innerHTML = "";
        submitBtn.style.display = "block";
      }, 3000);
    })
    .catch(error => {
      responseMessage.innerHTML = "Error";
      setTimeout(() => {
        responseMessage.innerHTML = "";
        submitBtn.style.display = "block";
      }, 3000);
    });
});

refreshBtn.addEventListener("click", () => {
  fetchData();
});

function fetchData() {
  fetch("http://localhost:3000/submitData", {
    method: "POST"
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}