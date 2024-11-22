let conversionRates = {};
fetch('https://v6.exchangerate-api.com/v6/e55b790e8387e029a03784e6/latest/USD')
  .then(response => response.json())
  .then(data => {
    conversionRates = data.conversion_rates;
    changed();
    changedP();
  })
  .catch(error => {
    console.error('Xəta baş verdi:', error);
  });

let buttons1 = document.querySelectorAll('.button1');
let activeButton1 = document.querySelector('.active1');
let buttons2 = document.querySelectorAll('.button2');
let activeButton2 = document.querySelector('.active2');
let currency1 = "RUB";
let currency2 = "USD";

buttons1.forEach(button1 => {
  button1.addEventListener("click", () => {
    if (activeButton1) {
      activeButton1.classList.remove("active1");
    }
    button1.classList.add("active1");
    activeButton1 = button1;
    currency1 = button1.innerText;
    changed();
    changedP();
  });
});

buttons2.forEach(button2 => {
  button2.addEventListener("click", () => {
    if (activeButton2) {
      activeButton2.classList.remove("active2");
    }
    button2.classList.add("active2");
    activeButton2 = button2;
    currency2 = button2.innerText;
    changed();
    changedP();
  });
});

let input1 = document.querySelector('.input1');
let input2 = document.querySelector('.input2');

input1.value = 1;

input1.addEventListener("input", () => {
  input1.value = input1.value.replace(/,/g , '.');
  let regex = /^(0(?!0)|[1-9][0-9]*)([,.][0-9]{0,5})?$/;
  if (input1.value[19] === '.' || input1.value[19] === ',') {
    input1.value = input1.value.slice(0, -1);
  }
  if (!regex.test(input1.value)) {
    input1.value = input1.value.slice(0, -1);
  }
  changed();
});

input2.addEventListener("input", () => {
  input2.value = input2.value.replace(/,/g , '.');
  let regex = /^(0(?!0)|[1-9][0-9]*)([,.][0-9]{0,5})?$/;
  if (input2.value[19] === '.' || input2.value[19] === ',') {
    input2.value = input2.value.slice(0, -1);
  }
  if (!regex.test(input2.value)) {
    input2.value = input2.value.slice(0, -1);
  }
  let input2Value = parseFloat(input2.value.replace(/,/g, '.')) || 0;
  if(!navigator.onLine){
    if(currency1 == currency2){
      input1.value = input2Value.toFixed(5);
    }
    else{
      input1.value = "";
    }
  }
  else{
    let multiplicationValue1 = conversionRates[currency1] * (1 / conversionRates[currency2]);
    if(currency1 != currency2){
      input1.value = (input2Value * multiplicationValue1).toFixed(5);
    }
    else{
      input1.value = input2Value.toFixed(5);
    }
  }
});

function changed() {
  let input1Value = parseFloat(input1.value.replace(/,/g, '.')) || 0;
  if(!navigator.onLine){
    if(currency1 == currency2){
      input2.value = input1Value.toFixed(5)
    }
    else{
      input2.value = "";
    }
  }
  else{
    let multiplicationValue = conversionRates[currency2] * (1 / conversionRates[currency1]);
    if(currency1 != currency2){
      input2.value = (input1Value * multiplicationValue).toFixed(5);
    }
    else{
      input2.value = input1Value.toFixed(5);
    }
  }
}
window.addEventListener('online',changed);
window.addEventListener('offline',changed);

let converter1 = document.querySelector('.converter1');
let converter2 = document.querySelector('.converter2')

function changedP(){
  if(!navigator.onLine){
    if(currency1 == currency2){
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>1</span> <span>${currency2}</span>`
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>1</span> <span>${currency1}</span>` 
    }
    else{
      converter1.innerHTML = `Could not convert`;
      converter2.innerHTML = `Could not convert`;
    }
  }
  else{
    if(currency1 != currency2){
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>${(conversionRates[currency2] * (1 / conversionRates[currency1])).toFixed(5)}</span> <span>${currency2}</span>`;
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>${(conversionRates[currency1] * (1 / conversionRates[currency2])).toFixed(5)}</span> <span>${currency1}</span>`;
    }
    else{
      converter1.innerHTML = `1 <span>${currency1}</span> = <span>1</span> <span>${currency2}</span>`;
      converter2.innerHTML = `1 <span>${currency2}</span> = <span>1</span> <span>${currency1}</span>`;  
    }
  }
}
window.addEventListener("online",changedP);
window.addEventListener("offline",changedP);

let errorElement = document.querySelector(".error")
function checkConnection() {
  if (navigator.onLine) {
    errorElement.style.display = "none"
  }
  else {
    errorElement.style.display = "block"
  }
}
checkConnection();
window.addEventListener("online",checkConnection);
window.addEventListener("offline", checkConnection);

const burger = document.querySelector(".burger");
const headerItem = document.querySelector(".header-item");
let buttondiv = document.querySelector(".buttondiv")
burger.addEventListener("click", () => {
  headerItem.classList.toggle("active");
  buttondiv.classList.toggle("act")
});