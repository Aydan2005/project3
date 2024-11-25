let conversionRates = {};
let lastInput = "input1";
let currency1 = "RUB";
let currency2 = "USD";
fetch('https://v6.exchangerate-api.com/v6/3b96f98a8b9315f4dd35c92b/latest/USD')
  .then(response => response.json())
  .then(data => {
    conversionRates = data.conversion_rates;
    changed();
    changedP();
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });
let buttons1 = document.querySelectorAll('.button1');
let activeButton1 = document.querySelector('.active1');
let buttons2 = document.querySelectorAll('.button2');
let activeButton2 = document.querySelector('.active2');
let input1 = document.querySelector('.input1');
let input2 = document.querySelector('.input2');
let converter1 = document.querySelector('.converter1');
let converter2 = document.querySelector('.converter2');
let errorElement = document.querySelector('.error');
buttons1.forEach(button1 => {
  button1.addEventListener("click", () => {
    if (activeButton1) activeButton1.classList.remove("active1");
    button1.classList.add("active1");
    activeButton1 = button1;
    currency1 = button1.innerText;
    changed();
    changedP();
  });
});
buttons2.forEach(button2 => {
  button2.addEventListener("click", () => {
    if (activeButton2) activeButton2.classList.remove("active2");
    button2.classList.add("active2");
    activeButton2 = button2;
    currency2 = button2.innerText;
    changed();
    changedP();
  });
});
input1.value = 1;
input1.addEventListener("input", () => {
  input1.value = validateInput(input1.value);
  lastInput = "input1";
  changed();
});
input2.addEventListener("input", () => {
  input2.value = validateInput(input2.value);
  lastInput = "input2";
  changed();
});
window.addEventListener("online", () => {
  fetchLatestExchangeRates();
  changed();
  changedP();
});
window.addEventListener("offline", () => {
  changed();
  changedP();
  checkConnection();
});
function changed() {
  let input1Value = parseFloat(input1.value) || 0;
  let input2Value = parseFloat(input2.value) || 0;
  if (!navigator.onLine) {
    if (currency1 === currency2) {
      if (lastInput === "input1") {
        input2.value = input1Value.toFixed(5);
      } else {
        input1.value = input2Value.toFixed(5);
      }
    } else {
      if (lastInput === "input1") {
        input2.value = "";
      } else {
        input1.value = "";
      }
    }
    return;
  }
  if (currency1 !== currency2 && conversionRates[currency1] && conversionRates[currency2]) {
    let rate = conversionRates[currency2] / conversionRates[currency1];
    if (lastInput === "input1") {
      input2.value = (input1Value * rate).toFixed(5);
    } else {
      input1.value = (input2Value / rate).toFixed(5);
    }
  } else if (currency1 === currency2) {
    if (lastInput === "input1") {
      input2.value = input1Value.toFixed(5);
    } else {
      input1.value = input2Value.toFixed(5);
    }
  }
}
function changedP() {
  if (!navigator.onLine) {
    if (currency1 === currency2) {
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>1</span> <span>${currency2}</span>`;
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>1</span> <span>${currency1}</span>`;
    } else {
      converter1.innerHTML = `Не могу обновить тарифы`;
      converter2.innerHTML = `Не могу обновить тарифы`;
    }
    return;
  }
  else{
    if (currency1 !== currency2) {
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>${(conversionRates[currency2] / conversionRates[currency1]).toFixed(5)}</span> <span>${currency2}</span>`;
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>${(conversionRates[currency1] / conversionRates[currency2]).toFixed(5)}</span> <span>${currency1}</span>`;
    } else {
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>1</span> <span>${currency2}</span>`;
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>1</span> <span>${currency1}</span>`;
    }
  }
}

function fetchLatestExchangeRates() {
  fetch('https://v6.exchangerate-api.com/v6/3b96f98a8b9315f4dd35c92b/latest/USD')
    .then(response => response.json())
    .then(data => {
      conversionRates = data.conversion_rates;
      changed();
      changedP();
    })
    .catch(error => {
      console.error('Error updating exchange rates:', error);
    });
}

function validateInput(value) {
  value = value.replace(/,/g, '.');
  let regex = /^(0(?!0)|[1-9][0-9]*)([,.][0-9]{0,5})?$/;
  if (value[19] === '.' || value[19] === ',') {
    value = value.slice(0, -1);
  }
    
  return regex.test(value) ? value : value.slice(0, -1);
}
function checkConnection() {
  if (navigator.onLine) {
    errorElement.style.display = "none";
  } else {
    errorElement.style.display = "block";
  }
}
checkConnection();
window.addEventListener("online",checkConnection);
window.addEventListener("offline",checkConnection);

const burger = document.querySelector(".burger");
const headerItem = document.querySelector(".header-item");
let buttondiv = document.querySelector(".buttondiv");
burger.addEventListener("click", () => {
  headerItem.classList.toggle("active");
  buttondiv.classList.toggle("act");
});