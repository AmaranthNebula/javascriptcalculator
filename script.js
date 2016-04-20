$(document).ready(function() {
   var values = [];
   
   function updateDisplay() {
       
   }
   
 function calculateSqrt(num) {
     var result = Math.sqrt(num);
     // check if result is more than 13 chars
     // call function to shorten if needed
     return result;
 }  
 //calculate the percent
 function calculatePercent(firstNum, symbol, secondNum) {
    var result;
     //convert percent to decimal
    secondNum = secondNum / 100;
    result  = result * secondNum;
    //call function to calculate new amount
     calculate(firstNum, symbol, result)
 }
 // determine how many characters there are after the period
 // if no period return 0
function findDecimalPlaces(num) {
    if (num.indexOf(".") === -1) {
        return 0;
    }
    return ((num.length -1) - num.indexOf("."));
}

//calculate the result of the first number and second number based on the mathematical symbol passed
function calculate(firstNum, symbol, secondNum) {
        var result;

       // convert strings to numbers
       if(firstNum.indexOf(".") !== -1 || secondNum.indexOf(".") !== -1) {
          var firstDecimalRange = findDecimalPlaces(firstNum);
          var secondDecimalRange = findDecimalPlaces(secondNum);
          var decimalPlaces = Math.max(firstDecimalRange, secondDecimalRange);

           //convert decimal to int
           firstNum *= Math.pow(10, decimalPlaces);
           secondNum *= Math.pow(10,decimalPlaces); 
        }

        firstNum = parseInt(firstNum);
        secondNum = parseInt(secondNum);

       switch (symbol) {
           case "+":
                result = firstNum + secondNum;
            break;
           case "-":
               result = firstNum - secondNum;
            break;
           case "x":
                result = firstNum * secondNum;
            break;
           case "&divide;":
                result = firstNum / secondNum;
            break;   
       }
       
       if (decimalPlaces !== undefined) {
           //convert value back to decimal
          result = result / Math.pow(10, decimalPlaces);
       }
       
       if (result.toString().length > 12) {
           result = result.toExponential(5);
       }
       return result;
   }
   
   
   //event handlers
   //when the decimal character is clicked
   $(".decimal").click(function(e){
       e.preventDefault();
       var current = $("#currentInput").text();
        if (current.length < 13 && current.indexOf(".") === -1) {
            $("#currentInput").append(".");
        }
        
   });
   // when a number is clicked
   $(".numeral").click(function(e) {
       e.preventDefault();
       var current = $("#currentInput").text();
       var value = $(this).html();
       // update display with new number 
       if (current.length < 13) {
            if (/^0$/.test(current)) {
                $("#currentInput").text("");
            }
            $("#currentInput").append(value);
            
       }
       
       var temp = "2 + 3";
       temp = parseFloat("+");
       
       console.log(temp);
   });
   //
   //             FINISH
   //when a mathematical symbol is clicked
   $(".symbol").click(function(e){
      e.preventDefault();
      var value = $(this).html();
      console.log(value); 
      
      //square root
      if (value === "&#8730;") {
          
      }else if ("=") {
          
      }else if ("%") {
          
      }else {
          
      }

   });
   //when  clear all is clicked
      $("#buttonC").click(function(e){
      e.preventDefault();
      values = [];
      $("#currentInput").html("0");
      $("#pastInput").html("");
      
   });
   // when the clear current is clicked
   $("#buttonCE").click(function(e){
      e.preventDefault();
      $("#currentInput").text("0");
   });
   //
   //             FINISH
   //when the memory buttons are clicked
   $(".memory").click(function(e){
       
   });
   
    
});