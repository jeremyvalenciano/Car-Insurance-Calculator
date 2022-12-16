//Constructors
function Insurance(brand, year, type) {
  this.brand = brand;
  this.year = year;
  this.type = type;
}
//We calculate the insurance
Insurance.prototype.calculate = function () {
  /*
    American = 1.15
    Asian = 1.05
    European = 1.35
   */
  let price;
  const base = 2000;
  switch (this.brand) {
    case '1':
      price = base * 1.15;
      break;
    case '2':
      price = base * 1.05;
      break;
    case '3':
      price = base * 1.35;
      break;
    default:
      break;
  }
  //read the year
  const diference = new Date().getFullYear() - this.year;
  //each year is 3% less
  price -= ((diference * 3) * price) / 100;
  /*
    Basic = 30% more
    COmplete = 50% more
   */
  if (this.type === 'basic') {
    price *= 1.30;
  } else {
    price *= 1.50;
  }
  return price;
}

function UI() {

}
//Fill the year option
UI.prototype.fillYears = () => {
  const max = new Date().getFullYear(),
    min = max - 10;
  const selectYear = document.querySelector('#year');
  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}
UI.prototype.showMessage = (message, type) => {
  const div = document.createElement('div');
  if (type === 'error') {
    div.classList.add('error');

  } else {
    div.classList.add('succes');
  }
  div.classList.add('message');
  div.textContent = message;
  //insert into form
  const form = document.querySelector('#insurance-form');
  form.insertBefore(div, document.querySelector('#send-button'));
  setTimeout(() => {
    div.remove();
  }, 3000)

}

UI.prototype.showResult = (insurance, total) => {
  const { brand, year, type } = insurance;
  let textBrand;

  switch (brand) {
    case '1':
      textBrand = 'American';
      break;
    case '2':
      textBrand = 'Asian';
      break;
    case '3':
      textBrand = 'European';
      break;
    default:
      break;
  }

  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
    <p class="header font-bold">Your Insurance</p>
    <p class="font-bold">Total: <span class="normal">$ ${total}</span></p>
    <p class="font-bold">Type: <span class="normal">$ ${type}</span></p>
    <p class="font-bold">Marca: <span class="normal"> ${textBrand} </span> </p>
    <p class="font-bold"> Total: <span class="normal"> $ ${year} </span> </p>
  `
  const result = document.querySelector('#result');
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'block';
  setTimeout(() => {
    spinner.style.display = 'none';
    result.appendChild(div);

  }, 3000)

}

//instantiate UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  ui.fillYears();
})

eventListeners();
function eventListeners() {
  const form = document.querySelector('#insurance-form');
  form.addEventListener('submit', calculateInsurance);
}

function calculateInsurance(e) {
  e.preventDefault();
  //know the selected brand
  const brand = document.querySelector('#brand').value;
  //know the selected year
  const year = document.querySelector('#year').value;
  //know the selected type
  const type = document.querySelector('input[name="type"]:checked').value;
  if (brand === 'none' || year === 'none' || type === '') {
    ui.showMessage('All fields are required', 'error');
    return;
  }
  ui.showMessage('Calculating', 'succes');
  //instantiate insurance
  const insurance = new Insurance(brand, year, type);
  const total = insurance.calculate();
  ui.showResult(insurance, total);
  //delete previous calcs of insurances
  const results = document.querySelector('#result div');
  if (results != null) {
    results.remove();
  }
}