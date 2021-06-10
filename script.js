const BASE_URL = 'https://api.exchangerate.host/latest';
const ERROR_MESSAGE = 'Algo de errado não está certo, tente novamente mais tarde!';

const currencyList = document.querySelector('#currency-list');

function renderRates(base, rates){
  const baseElement = document.querySelector('#base-currency');
  baseElement.innerText = base;
  
  const ratesEntries = Object.entries(rates);

  ratesEntries.forEach(([ currency, rate ]) => {
    const li = document.createElement('li');
    li.innerText = `${currency}: ${rate}`;

    currencyList.appendChild(li)
  })
}

function cleanRates(){
  currencyList.innerHTML = '';
}

function fetchCurrency(currency) {
  fetch(`${BASE_URL}?base=${currency}`)
    .then((response) => response.json())
    .then(({ base, rates }) => {
      cleanRates();
      renderRates(base, rates);
    })
    .catch(() => {
      alert(ERROR_MESSAGE)
    })
}

async function fetchCurrencyAsync(currency){
  try {
    const response = await fetch(`${BASE_URL}?base=${currency}`)
    const { base, rates } = await response.json();
    
    cleanRates();
    renderRates(base, rates);
  } catch(error) {
    alert(ERROR_MESSAGE)
  }
}

function setupEvents(){
  const button = document.querySelector('#search-button');
  button.addEventListener('click', () => {
    const { value } = document.querySelector('#currency-input')
    fetchCurrency(value);
  })
}

window.onload = () => {
  setupEvents(); 
  fetchCurrencyAsync('BRL');
}  