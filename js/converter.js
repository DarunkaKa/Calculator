const converterContainer = document.getElementById('converter-container');
const converterToggle = document.getElementById('converter-toggle');
const converterDropdown = document.getElementById('converter-dropdown');
const conversionType = document.getElementById('conversion-type');
const butCalc = document.getElementById('standart2');
const conversionType2 = document.getElementById('conversion-type2');
const conversionType3 = document.getElementById('conversion-type3');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');
let selectedConversionType;

function toggleConverter() {
    numbersElement.textContent = "0";
    resultElement.textContent = "";
    calcContainer.style.display = 'none';
    buts.style.display = 'none';
    converterContainer.style.display = 'block';
    converterDropdown.style.display = "block";
}

function showStandartCalculator() {
    converterContainer.style.display = 'none';
    calcContainer.style.display = 'block';
    buts.style.display = 'block';
    converterDropdown.style.display = "none";
}



function updateConversionType2() {
    selectedConversionType = conversionType.value;
    conversionType2.innerHTML = '';
    conversionType3.innerHTML = '';

    if (selectedConversionType === 'length') {
        const lengthOptions = ['Centimeters', 'Meters', 'Kilometers'];
        lengthOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    }

    else if (selectedConversionType === 'temperature') {
        const temperatureOptions = ['Celsius', 'Fahrenheit', 'Kelvin'];
        temperatureOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    } 
    
    else if (selectedConversionType === 'area') {
        const areaOptions = ['Square Meters', 'Square Kilometers', 'Square Centimeterst'];
        areaOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    } 
    else if (selectedConversionType === 'mass') {
        const massOptions = ['Grams', 'Kilograms', 'Tonnes'];
        massOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    } 
    
    else if (selectedConversionType === 'data') {
        const dataOptions = ['Binary', 'Decimal', 'Hexadecimal'];
        dataOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    } 
    
    else if (selectedConversionType === 'speed') {
        const speedOptions = ['Kilometer per hour', 'Metre per minute'];
        speedOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    } 
    
    else if (selectedConversionType === 'time') {
        const speedOptions = ['Hours', 'Minutes', 'Seconds'];
        speedOptions.forEach((option) => {
            const newOption2 = document.createElement('option');
            const newOption3 = document.createElement('option');
            newOption2.value = option.toLowerCase();
            newOption3.value = option.toLowerCase();
            newOption2.textContent = option;
            newOption3.textContent = option;
            conversionType2.appendChild(newOption2);
            conversionType3.appendChild(newOption3);
        });
    }
}


function convert() {
    const selectedConversionType2 = conversionType2.value;
    const selectedConversionType3 = conversionType3.value;
    const inputValue = parseFloat(fromValue.value);
    if (isNaN(inputValue) || (inputValue < 0 && selectedConversionType !== 'temperature')) {
        toValue.value = "Invalid format";
        return;
    } 

    let convertedValue;
    
    if (selectedConversionType === 'length') {
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'centimeters' && selectedConversionType3 === 'meters') {
            convertedValue = inputValue / 100;
        } else if (selectedConversionType2 === 'centimeters' && selectedConversionType3 === 'kilometers') {
            convertedValue = inputValue / 100000;
        } else if (selectedConversionType2 === 'meters' && selectedConversionType3 === 'centimeters') {
            convertedValue = inputValue * 100;
        } else if (selectedConversionType2 === 'meters' && selectedConversionType3 === 'kilometers') {
            convertedValue = inputValue / 1000;
        } else if (selectedConversionType2 === 'kilometers' && selectedConversionType3 === 'centimeters') {
            convertedValue = inputValue * 100000;
        } else if (selectedConversionType2 === 'kilometers' && selectedConversionType3 === 'meters') {
            convertedValue = inputValue * 1000;
        }
        
    } 
    
    else if (selectedConversionType === 'temperature') {
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'celsius' && selectedConversionType3 === 'fahrenheit') {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (selectedConversionType2 === 'celsius' && selectedConversionType3 === 'kelvin') {
            convertedValue = inputValue + 273.15;
        } else if (selectedConversionType2 === 'fahrenheit' && selectedConversionType3 === 'celsius') {
            convertedValue = (inputValue - 32) / 1.8;
        } else if (selectedConversionType2 === 'fahrenheit' && selectedConversionType3 === 'kelvin') {
            convertedValue = (inputValue + 459.67) / 1.8;
        } else if (selectedConversionType2 === 'kelvin' && selectedConversionType3 === 'fahrenheit') {
            convertedValue = (inputValue - 273.15) * 1.8 + 32;
        } else if (selectedConversionType2 === 'kelvin' && selectedConversionType3 === 'celsius') {
            convertedValue = inputValue - 273.15;
        }
    } 
    
    else if (selectedConversionType === 'area') { 
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'square meters' && selectedConversionType3 === 'square kilometers') {
            convertedValue = inputValue / 1000000;
        } else if (selectedConversionType2 === 'square meters' && selectedConversionType3 === 'square centimeterst') {
            convertedValue = inputValue * 10000;
        } else if (selectedConversionType2 === 'square kilometers' && selectedConversionType3 === 'square meters') {
            convertedValue = inputValue * 1000000;
        } else if (selectedConversionType2 === 'square kilometers' && selectedConversionType3 === 'square centimeterst') {
            convertedValue = inputValue * 10000000000;
        } else if (selectedConversionType2 === 'square centimeterst' && selectedConversionType3 === 'square kilometers') {
            convertedValue = inputValue / 10000000000;
        } else if (selectedConversionType2 === 'square centimeterst' && selectedConversionType3 === 'square meters') {
            convertedValue = inputValue / 10000;
        }
    } 
    
    else if (selectedConversionType === 'mass') { 
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'grams' && selectedConversionType3 === 'kilograms') {
            convertedValue = inputValue / 1000;
        } else if (selectedConversionType2 === 'grams' && selectedConversionType3 === 'tonnes') {
            convertedValue = inputValue * 1000000;
        } else if (selectedConversionType2 === 'kilograms' && selectedConversionType3 === 'tonnes') {
            convertedValue = inputValue / 1000;
        } else if (selectedConversionType2 === 'kilograms' && selectedConversionType3 === 'grams') {
            convertedValue = inputValue * 1000;
        } else if (selectedConversionType2 === 'tonnes' && selectedConversionType3 === 'kilograms') {
            convertedValue = inputValue * 1000;
        } else if (selectedConversionType2 === 'tonnes' && selectedConversionType3 === 'gramss') {
            convertedValue = inputValue * 1000000;
        }
    } 
    
    else if (selectedConversionType === 'data') { 
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'binary' && selectedConversionType3 === 'decimal') {
            convertedValue = parseInt(inputValue, 2);
        } else if (selectedConversionType2 === 'binary' && selectedConversionType3 === 'hexadecimal') {
            convertedValue = parseInt(inputValue, 2).toString(16);
        } else if (selectedConversionType2 === 'decimal' && selectedConversionType3 === 'binary') {
            convertedValue = inputValue.toString(2);
        } else if (selectedConversionType2 === 'decimal' && selectedConversionType3 === 'hexadecimal') {
            convertedValue = inputValue.toString(16);
        } else if (selectedConversionType2 === 'hexadecimal' && selectedConversionType3 === 'decimal') {
            convertedValue = parseInt(inputValue, 16);
        } else if (selectedConversionType2 === 'hexadecimal' && selectedConversionType3 === 'binary') {
            convertedValue = parseInt(inputValue, 16).toString(2);
        } 
    } 
    
    else if (selectedConversionType === 'speed') { ['Kilometer per hour', 'Metre per minute'];
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'kilometer per hour' && selectedConversionType3 === 'metre per minute') {
            convertedValue = inputValue * 1000 / 60;
        } else if (selectedConversionType2 === 'metre per minute' && selectedConversionType3 === 'kilometer per hour') {
            convertedValue = inputValue * 60 / 1000;
        }
    } 
    
    else if (selectedConversionType === 'time') { ['Hours', 'Minutes', 'Seconds'];
        if (selectedConversionType2 === selectedConversionType3) {
            convertedValue = inputValue;
        } else if (selectedConversionType2 === 'hours' && selectedConversionType3 === 'minutes') {
            convertedValue = inputValue * 60;
        } else if (selectedConversionType2 === 'hours' && selectedConversionType3 === 'seconds') {
            convertedValue = inputValue * 3600;
        } else if (selectedConversionType2 === 'minutes' && selectedConversionType3 === 'hours') {
            convertedValue = inputValue / 60;
        } else if (selectedConversionType2 === 'minutes' && selectedConversionType3 === 'seconds') {
            convertedValue = inputValue * 60;
        } else if (selectedConversionType2 === 'seconds' && selectedConversionType3 === 'hours') {
            convertedValue = inputValue / 3600;
        } else if (selectedConversionType2 === 'seconds' && selectedConversionType3 === 'minutes') {
            convertedValue = inputValue / 60;
        }
    }

    if (typeof convertedValue === 'string') {
        toValue.value = convertedValue;
    } 
    else { 
        let number;
        if (Number.isInteger(convertedValue)) {
            number = convertedValue.toFixed(0); 
        } 
        else {
            const decimalDigits = Math.min(10, convertedValue.toString().split('.')[1]?.length || 0); 
            number = convertedValue.toFixed(decimalDigits); 
        }
        toValue.value = number;
    }
}

buttonCon.addEventListener('click', () => {
    toggleConverter();
    localStorage.setItem('showConverter', 'true');
});
    
butCalc.addEventListener('click', () => {
    showStandartCalculator();
    localStorage.setItem('showConverter', 'false');
});


conversionType.addEventListener('change', updateConversionType2);
conversionType.addEventListener('change', convert);
conversionType2.addEventListener('change', convert);
conversionType3.addEventListener('change', convert)
fromValue.addEventListener('input', convert);


const showConverter = localStorage.getItem('showConverter');
if (showConverter === 'true') {
    toggleConverter();
} 
else {
    showStandartCalculator();
}

conversionType.addEventListener('change', () => {
    toValueInput.disabled = true;
});

window.addEventListener('load', () => {
    selectedConversionType = 'length';
    updateConversionType2();
    conversionType.value = selectedConversionType;
    const showCoventatorValue = localStorage.getItem('showConverter');
    if (showCoventatorValue === 'true') {
        toggleConverter();
    } else {
        showStandartCalculator();
    }
});