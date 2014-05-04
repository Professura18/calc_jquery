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
$(".calcNum").on("click",clickNumPad);

//запретить фокус на поле ввода
$("#inpCalc").focus(function(){
  $(this).blur();
});


function pressKeyNumPad(event) {	
	switch (event.which) {
	  case 49:
	    addNumer("1");
		break;
		
	  case 50:
	    addNumer("2");
		break;
		
	  case 51:
	    addNumer("3");
		break;
		
	  case 52:	  
	    addNumer("4");
		break;
		
	  case 53:	 
	    addNumer("5");
		break;
		
	  case 54:
	    addNumer("6");
		break;
			
	  case 55:
	    addNumer("7");
		break;
		
	  case 56:
	    addNumer("8");
		break;
		
	  case 57:
	    addNumer("9");
		break;	
		
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
		break;								
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
	  case "1":
	    addNumer("1");
		break;
		
	  case "2":
	    addNumer("2");
		break;
		
	  case "3":
	    addNumer("3");
		break;
		
	  case "4":	  
	    addNumer("4");
		break;
		
	  case "5":	 
	    addNumer("5");
		break;
		
	  case "6":
	    addNumer("6");
		break;
			
	  case "7":
	    addNumer("7");
		break;
		
	  case "8":
	    addNumer("8");
		break;
		
	  case "9":
	    addNumer("9");
		break;	
		
	  case "0":
	    addNumer("0");
		break;
		
	  case ".":
	    toDot();
		break;
		
	  case "←":
	    toBackSpace();
		break;		

	  case "=":
	    toResult();
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
	arg1 = parseFloat(str);
	sign = charSign;
	clearField();
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
	res = 0;
	arg1 = 0;
	arg2 = 0;
	sing = "";
	str = "";
}
