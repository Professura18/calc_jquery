var countOperation = 0;				// Подсчитывает кол-во операций
var flagResult = false;				// отслеживает нажатие "равно"
var re = /.*\.0*.*/; 				// регулярное выражение
var str = ""; 						// для временного хранения введеных данных в строке
var arg1 = 0; 						// перове введеное число
var arg2 = 0; 						// второе введенное число
var res = 0; 						// результат
var num = 0; 						// для временного хранения введеных данных числах
var sign = ""; 						// арифметический знак
var inputFeild = $("#inpCalc");	//поле вывода данных
var dot = $("#dot");				//кнопка с точкой (нужна чтобы нельзя было ввести две и более точки в числе)

$(window).on("keypress", pressKeyNumPad);
$(window).on("keydown", keyDownBsEsc);
$(".calcNum").on("click", clickNumPad);

//запретить фокус на поле ввода
$("#inpCalc").focus(function() {
    $(this).blur();
});


function pressKeyNumPad(event) {	
	switch (event.which) {	
	  case 48:
		addNumer("0");	    	
		break;
		
	  case 47:
	    toOperator("/");
		break;
		
	  case 42:
		toOperator("*");
		break;
		
	  case 45:
		toOperator("-");
		break;
		
	  case 43:	  
		toOperator("+");
		break;					  									
		
	  case 46: //Dot, English layout
	    toDot();
		break;
		
	  case 13: //Enter
	    toResult();
		flagResult = true;
		break;
	}
	
	if (event.which >= 49 && event.which <= 57) {
		addNumer(event.which - 48);
	}
}

function keyDownBsEsc(event) {
	switch (event.which) {
	  case 27: //ESC
	    clearField();
		break;	
		
	  case 8: //BackSpace
	    toBackSpace();
		break;
	}
}

function clickNumPad(event) {
	switch (event.target.value) {		
	  case ".":
	    toDot();
		break;
		
	  case "←":
	    toBackSpace();
		break;		

	  case "=":
	    toResult();
		flagResult = true;		
		break;	
		
	  case "C":
	    clearField();
		break;

	  case "/":
	    toOperator("/");
		break;
		
	  case "*":
		toOperator("*");
		break;
		
	  case "-":
		toOperator("-");
		break;
		
	  case "+":	  
		toOperator("+");
		break;
		
	  case "1/x":	  
		toSpecialOperator("1/x");
		break;		

	  case "√x":	  
		toSpecialOperator("√x");
		break;
		
	  default:
	    addNumer(event.target.value);
	}
}

function parseInput() {	
	if (str.search(re) != -1) {
		inputFeild.val(str);
	} else {
		num = parseFloat(str);
		inputFeild.val(num);				
		str = "" + num;
	}
}

function addNumer(charNum) {	
	str += charNum;
	parseInput();
}

function toBackSpace() {
	if (str.length > 1) {
		str = str.slice(0, str.length - 1);
		parseInput();
	}
}

function toOperator(charSign) {
	if (countOperation != 0) {
		
		if (flagResult == true) {
			sign = charSign;								
		} else {
			toResult();
			sign = charSign;
		}
		
	} else {
		arg1 = parseFloat(str);
		sign = charSign;
		clearField();
	}
	
	countOperation++;
}

function toSpecialOperator(charSign) {
	arg1 = parseFloat(str);
	sign = charSign;
	toResult();
}

function clearField() {
	str = "0";
	inputFeild.val(str);
	res = 0;
	arg2 = 0;
	countOperation = 0;
	flagResult = false;
}

function toDot() {
	if (str.search(re) == -1){
		str += ".";
		inputFeild.val(str);
	}
}

function toResult() {
	arg2 = parseFloat(str);
	
	switch (sign) {
	  case "/":
		res = arg1 / arg2;
		break;
		
	  case "*":
		res = arg1 * arg2;
		break;
		
	  case "+":
		res = arg1 + arg2;
		break;
		
	  case "-":	  
		res = arg1 - arg2;
		break;
	
	  case "1/x":	  
		res = 1.0 / arg1;
		break;

	  case "√x":	  
		res = Math.sqrt(arg1);
		break;						
	}
	
	inputFeild.val(res);
	arg1 = res;
	arg2 = 0;
	sing = "";
	str = "";
}
