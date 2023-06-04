const buttonShowCalc = document.getElementById('but-2');
const containerAll = document.querySelector(".container");
const buttnoReturn = document.getElementById("return-old");


function showNewCalc() {
  numbersElement.textContent = "0";
  calculation = "";
  resultElement.textContent = "";
  
  containerAll.style.width = '540px';
  containerAll.style.height = '480px';

  const inactiveButtons = document.querySelectorAll('.big-calc');
  inactiveButtons.forEach((button) => {
    button.style.display = 'inline-block';
  });
  
  localStorage.setItem('showCalc', 'true');
}

function showStCalculator() {
  numbersElement.textContent = "0";
  calculation = "";
  resultElement.textContent = "";
  
  containerAll.style.width = '360px';
  containerAll.style.height = '480px';
  
  const inactiveButtons = document.querySelectorAll('.big-calc');
  inactiveButtons.forEach((button) => {
    button.style.display = 'none';
  });

  localStorage.setItem('showCalc', 'false');
}

buttonShowCalc.addEventListener('click', () => {
  showNewCalc();
});

buttnoReturn.addEventListener('click', () => {
  showStCalculator();
});


const bigCalcButtons = document.querySelectorAll('.big-calc');
bigCalcButtons.forEach((button) => {
  button.addEventListener('click', () => {
  });
});


window.addEventListener('load', () => {
  const showHistoryValue = localStorage.getItem('showCalc');
  if (showHistoryValue === 'true') {
    showNewCalc();
  } else {
    showStCalculator();
  }
});
