var firstNumber = randomInRange(6, 9),
secondNumber = randomInRange(11, 14) - firstNumber,
sumNumbers = firstNumber + secondNumber,
body = document.body;

function randomInRange(min, max) { 
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var expression = document.createElement('div');
expression.classList.add('expression');
expression.innerHTML = `
	<span class="first-number">${firstNumber}</span> + <span class="second-number">${secondNumber}</span>  =  <span class="amount">?</span>
`;

var expressionFirstNumber = expression.querySelector('.first-number'),
expressionSecondNumber = expression.querySelector('.second-number'),
amount = expression.querySelector('.amount');

body.insertAdjacentElement('afterBegin', expression);

var convCont = body.querySelector('.cnvs-container'),
canvas = document.querySelector('.cnvs'),
ctx = canvas.getContext('2d'),
ruler = body.querySelector('.ruler'),

cm = 41.2,
centerFirstArc = (cm * firstNumber) / 2,
endFirstArc = cm * firstNumber,
centerSecondArc = ((cm * firstNumber) + ((cm * firstNumber) + (cm * secondNumber))) / 2,
endSecondArc = (cm * secondNumber) + (cm * firstNumber);


function createFirstArc() { 
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'purple';
	ctx.moveTo(0, 85); 
	ctx.quadraticCurveTo(centerFirstArc, -60, endFirstArc, 85);
	ctx.stroke();

	ctx.beginPath(); 
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 15, 80);
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 2, 72);
	ctx.stroke();
};

function createSecondArc() { 
	ctx.beginPath();
	ctx.moveTo(endFirstArc, 85);
	ctx.quadraticCurveTo(centerSecondArc, 10, endSecondArc, 85);
	ctx.stroke();

	ctx.beginPath(); 
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 15, 80);
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 2, 73);
	ctx.stroke();
};

var firstNumberInput = document.createElement('input');
firstNumberInput.setAttribute("type", "text");
firstNumberInput.setAttribute("maxlength", "1");
firstNumberInput.classList.add('numberInput');
convCont.append(firstNumberInput);
firstNumberInput.style.left = ((centerFirstArc - 22) + 'px');
firstNumberInput.style.top = (-40 + 'px'); 
createFirstArc();

var secondNumberInput = document.createElement('input');

function appendSecondInputValue() { 
	var inputs = document.querySelectorAll('input');
	for (var input of inputs) {

		if (!input.disabled) {
			return;
		} else if (input.disabled) {
			secondNumberInput.setAttribute("type", "text");
			secondNumberInput.setAttribute("maxlength", "1");
			secondNumberInput.classList.add('numberInput');
			convCont.append(secondNumberInput);
			secondNumberInput.style.left = ((centerSecondArc - 35) + 'px');
			secondNumberInput.style.top = (-7 + 'px'); 
			createSecondArc(); 
		}
	};
};

var resultInput = document.createElement('input');
resultInput.setAttribute("type", "text");
resultInput.setAttribute("maxlength", "2");
resultInput.classList.add('resultInput');

function checkValue(inputValue, spanValue, span) { 
	if (inputValue.value != spanValue) {
		inputValue.classList.add('inputError');
		span.classList.add('spanError');
	} else {
		inputValue.disabled = true;
		inputValue.classList.remove('inputError');
		span.classList.remove('spanError');
		appendSecondInputValue();
	};

	if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
		amount.after(resultInput); 
		amount.remove();
	};

};

function checkResult() { 
	if (resultInput.value === String(sumNumbers)) {
		resultInput.disabled = true;
		resultInput.classList.remove('inputError');
	} else {
		resultInput.classList.add('inputError');
	}
};

firstNumberInput.onclick = () => firstNumberInput.value = "";
secondNumberInput.onclick = () => secondNumberInput.value = "";
resultInput.onclick = () => resultInput.value = "";
firstNumberInput.oninput = () => checkValue(firstNumberInput, firstNumber, expressionFirstNumber);
secondNumberInput.oninput = () => checkValue(secondNumberInput, secondNumber, expressionSecondNumber);
resultInput.oninput = checkResult;
