const historyContainer = document.getElementById('history-con');
const buttonCalc = document.getElementById('history-standart');
const buttonHistory = document.getElementById('clear-history');
const divHistory = document.getElementById('history-container');

function showHistory() {
  numbersElement.textContent = "0";
  resultElement.textContent = "";
  calcContainer.style.display = "none";
  buts.style.display = 'none';
  
  historyContainer.style.display = 'block';
  divHistory.style.display = 'block';
  buttonCalc.style.display = 'block';
  buttonHistory.style.display = 'block';
  divHistory.innerHTML = '';
  const history = localStorage.getItem('calculator') ? JSON.parse(localStorage.getItem('calculator')) : [];
  if (history.length === 0) {
    divHistory.innerHTML = "[Empty]";
  }

  history.forEach((item) => {
    const historyItem = document.createElement('div');
    historyItem.textContent = item;
    divHistory.appendChild(historyItem);
  });
  localStorage.setItem('showHistory', 'true');
}

function showCalculator() {
  calcContainer.style.display = 'block';
  buts.style.display = 'block';
  historyContainer.style.display = 'none';
  divHistory.style.display = 'none';
  buttonCalc.style.display = 'none';
  buttonHistory.style.display = 'none';
  localStorage.setItem('showHistory', 'false');
}

function clearNotes() {
  const confirmation = confirm("Are you sure?");
  if (confirmation) {
    localStorage.removeItem("calculator");
    divHistory.innerHTML = "[Empty]";
  }
}

historyButton.addEventListener('click', () => {
  localStorage.setItem('showHistory', 'true');
  showHistory();
});

buttonCalc.addEventListener('click', () => {
  localStorage.setItem('showHistory', 'false');
  showCalculator();
});



const showHis= localStorage.getItem('showHistory');
if (showHis === 'true') {
    showHistory();
} 
else {
    showCalculator();
}

window.addEventListener('load', () => {
    const showCoventatorValue = localStorage.getItem('showHistory');
    if (showCoventatorValue === 'true') {
        showHistory();
    } else {
        showCalculator();
    }
});


