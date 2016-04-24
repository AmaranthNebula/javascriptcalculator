$(document).ready(function() {
   var values = [];
   var equalClicked = false;
   var memory = 0;
   
   // this function updates the display on the calculator GUI
   // noPast is a boolean that clears the pastInput of all text
   function updateDisplay(result, pastInput) {
       // if "divide" appears in pastInput, replace with division symbol
       pastInput = pastInput.replace("divide", "&divide;")
       // clear previous inputs
       $("#pastInput").html("");
       $("#currentInput").html("");
       
       //update the current value with the result from previous
       $("#currentInput").html(result);
       
       //if the past data is to be shown
       // put the previous calcuations on the GUI
       if(Boolean(pastInput)) {
           $("#pastInput").html(pastInput);
       }
       
   }
   
   //format values for display
   function formatForDisplay(num) {
       //convert to string to format result
       num = num.toString();
       // if number is larger than display
       // convert to exponential notation
       if (num.length >= 16) {
           num = parseFloat(num);
           num = num.toPrecision(15);
       }
       // if number is less than 16 digits
       // add commas every three digits before decimal point
       else {
           //conver to array
            num = num.split("");
            //find location of
            var pos = num.indexOf(".");
            // if it is not decimal start from end of string
            // if it is a descimal, subtract 3 from position get first comma index
             if (pos === -1) {
                    pos = num.length-3;
             } else  {
                    pos -=3;
             }    
            while (pos > 0 && num[pos-1] !== "-") {
                num.splice(pos, 0, ",");
                pos -= 3; 
            }
            num =num.join("");
       }
       
       return num;
   }
   
   //
   //calculation functions
   //
   
    // pass two numbers (can be string) and an arithmetic operator
    // perform calculation based on arithmetic operator    
    function calculate (firstNum, operator, secondNum) {
        // if multiplying or dividing two numbers that are both decimals
        // to convert back to Decimals, divide by 10 to the power of decimal places twice
        var squareDecimalPlaces = ((operator === "x" || operator === "divide"));
        var result;
        //get int values
        var value = convertToInt(firstNum, secondNum);
        // find the matching symbol and perform calculation
        switch (operator) {
            case "+":
                result = value.first + value.second;
                break;
            case "-":
                result = value.first - value.second;
                break;
            case "x":
                result = value.first * value.second;
                break;
            case "divide":
                result = value.first / value.second;
                break;
        }// end switch
                
         if (value.places !== undefined && operator !== "divide") {
             result = convertToDec(result, value.places, squareDecimalPlaces);
         }       
                
        return result;
    } //end of calculate function


    
    //
    //fixing floating point inaccuracy functions
    //
    // determine how many characters there are after the period
    // if no period return 0
    function findDecimalPlaces(num) {
        if (num.indexOf(".") === -1) {
            return 0;
        }
            return ((num.length -1) - num.indexOf("."));
        }

    //convert floating point numbers to integers to fix
    // inaccuracy issue
    function convertToInt(firstNum, secondNum) {
        firstNum = firstNum.toString();
        secondNum  = secondNum.toString();
        //if there is decimal point, convert to Int and return values
        if (firstNum.indexOf(".") !== -1 || secondNum.indexOf(".") !== -1){
                //find decimal places for each number
            var firstDecimalRange = findDecimalPlaces(firstNum);
            var secondDecimalRange = findDecimalPlaces(secondNum);
            //find the greatest number of decimal places
            var decimalPlaces = Math.max(firstDecimalRange, secondDecimalRange);
            
            //convert decimals to int
            firstNum *= Math.pow(10, decimalPlaces);
            secondNum *= Math.pow(10,decimalPlaces);
            
            return {"first": parseInt(firstNum), "second": parseInt(secondNum), "places": decimalPlaces};
        }
        // if it is not a decimal, convert to int from string and return 
        return {"first": parseInt(firstNum), "second": parseInt(secondNum), "places": undefined}
    }    
    
    function convertToDec(num, decimalPlaces, multipyBoolean) {
        // if values are multiplied or divided just multipy that product/quotient by 10 to the n power twice
        // n = the number of decimal places in the orignal values
        if (multipyBoolean) {
            var powerMultiplier = (Math.pow(Math.pow(10, decimalPlaces), 2));
        }
        // if values are added or subtracted just multipy that sum/difference by 10 to the n power
        // n = the number of decimal places in the orignal values
        else {
            var powerMultiplier = Math.pow(10, decimalPlaces);
        }
        var test = num / powerMultiplier;
        return test;
    }   


    // functions for the eventhandlers - mouse/tap and keyboard events
  
  function decimalInput() {
       var current = $("#currentInput").text();
        if (current.length < 13 && current.indexOf(".") === -1) {
            $("#currentInput").append(".");
        }      
  }
  function numeralInput(value) {
       var current = $("#currentInput").text();
       //remove all commas in GUI formatted value
       current = current.replace(/\,/g, "");

       // update display with new number 
       if (current.length < 15 || equalClicked) {
           
            if (/^0$/.test(current) || equalClicked) {
                $("#currentInput").text("");
                current = "";
                //reset boolean to not clear next input
                equalClicked = false;
            }
            // format new input with appropriate commas
            current += value; 
            current = formatForDisplay(current);
            $("#currentInput").html(current);
       }      
  } 
 function symbolInput(operator) {
      var result;     
       //get current values from GUI
       var current = $("#currentInput").text();
       //remove formatting
       current = current.replace(/\,/g, "");

       // for the first value inputted: save values to array
       if (values[0] === undefined) {
           values.push(current);
           values.push(operator);
           updateDisplay("", formatForDisplay(current) + " " + operator);
       }else if (current === "") {
           values[1] = operator;
           updateDisplay("", formatForDisplay(values[0]) + " " + operator)
       }
        //fix for divide by zero
       else if (current === "0" && values[1] === "divide") {
           $("#currentInput").html("infinity");
           $("#pastInput").html("")
           equalClicked = true;
           values = [];
       }
       else {
           result = calculate(values[0], values[1], current);
           //assign new values to array
           values[0] = result;
           values[1] = operator;
           result = formatForDisplay(result);
           updateDisplay("", result + " " + operator);
       }      
 }  
 function percentInput() {
       var current = $("#currentInput").text();
       current = current.replace(/\,/g, "");
       // convert to decimal equivalent
       current = current/100;
       //set default calculation if no values have been saved
       if (values[0] === undefined) {
           values[0] = 0;
           values[1] = "x";
       }
       
        // find result from values[0] * the current percent in decimal form
        var result = calculate(values[0], "x", current);

       if (values[1] !== "x") {

            var pastInput = formatForDisplay(values[0]) + " " + values[1] + " " + formatForDisplay(result);
            // find sum/difference between the percentage result above and the first values and operator inputted
             result = calculate(values[0], values[1], result);
       } else {
            var pastInput = formatForDisplay(values[0]) + " " + values[1] + " " + formatForDisplay(current);
       }
       result = formatForDisplay(result);
       values=[];
       updateDisplay(result, pastInput);     
 }
 function equalInput() {
       var current = $("#currentInput").text();
              //get current values from GUI
       var current = $("#currentInput").text();
       //remove formatting
       current = current.replace(/\,/g, "");
       
       if (values[0] === undefined || current === ""){
           updateDisplay(current, "");
          
       }
       //fix for divide by zero
       else if (current === "0" && values[1] === "divide") {
            $("#currentInput").html("infinity");
           $("#pastInput").html("");
           equalClicked = true;
           values = [];
       }else {
           result = calculate(values[0], values[1], current);
           result = formatForDisplay(result);
           updateDisplay(result, "");
       }
        //clear array
        values = [];
        equalClicked = true;     
 }
 
 
 
   
   //event handlers
   //when the decimal character is clicked
   $("#buttonDecimal").click(function(e){
       e.preventDefault();
       decimalInput();
   });
   // when a number is clicked
   $(".numeral").click(function(e) {
       e.preventDefault();
       // get Value of button that was pressed
       var value = $(this).html();       
       numeralInput(value);
   });
   //when a mathematical symbol is clicked
   $(".symbol").click(function(e){
      e.preventDefault();
     if ($(this).is("#buttonDivide")) {
         var operator = "divide";
     }else {
      var operator = $(this).html();
     }
     symbolInput(operator);
   });
   //can convert current value to positive or negative value
   $("#buttonPosNeg").click(function(e){
      e.preventDefault();
        //get current values from GUI
       var current = $("#currentInput").text();
       //remove formatting
       current = current.replace(/\,/g, "");
       var result = calculate(current, "x", "-1");
       
       result = formatForDisplay(result);
       updateDisplay(result,$("#pastInput").html());
       
   });
   $("#buttonSqrt").click(function(e) {
       e.preventDefault();
       var pastInput = $("#pastInput").text();
       var current = $("#currentInput").text();
       current = current.replace(/\,/g, "");
       if (current < 0) {
           $("#currentInput").html("invalid input");
           $("#pastInput").html("")
           equalClicked = true;
           values = [];
       }else {
            var result = Math.sqrt(current);
            result = formatForDisplay(result);
            updateDisplay(result, pastInput);
       }
   });
   $("#buttonPercent").click(function(e) {
       e.preventDefault();
       percentInput();
   });
   $("#buttonEqual").click(function(e){
       e.preventDefault();
       equalInput();
   });
   //when  clear all is clicked
      $("#buttonC").click(function(e){
      e.preventDefault();
      values = [];
      $("#pastInput").html("");
      $("#currentInput").html("0");
      
   });
   // when the clear current is clicked
   $("#buttonCE").click(function(e){
      e.preventDefault();
      $("#currentInput").text("0");
   });
   
   //when the memory buttons are clicked
   // memory values are stored in global "memory" variable
   // clear value in memory
   $("#buttonMC").click(function(e){
      memory = 0;
      updateMemoryStyle();
   });
   // display value saved to memory
   $("#buttonMR").click(function(e){
      var recalled = formatForDisplay(memory);
      $("#currentInput").html(recalled);
   });
   
    // save to memory
   $("#buttonMS").click(function(e){
       // get current value
      var current = getCurrentValue();
      memory = current;  
      updateMemoryStyle();      
   });
   // add to memory
   $("#buttonMAdd").click(function(e){
      var current = getCurrentValue();
      memory += current;  
      updateMemoryStyle();
   });
   // subtract from memory
   $("#buttonMSubtract").click(function(e){
      var current = getCurrentValue();
      memory -= current;  
      updateMemoryStyle();
   });
   
   // when the memory variable does not equal zero;
   // add class to make border outline a darker blue and on hover a lighter orange
   function updateMemoryStyle() {
       if (memory !== 0) {
           $(".memory").addClass("memorySaved");
       }else {
          $(".memory").removeClass("memorySaved");  
       }
   }         
   function getCurrentValue() {
      // get current value
      var current = $("#currentInput").text();
      current = current.replace(/\,/g, "");
      //if there is no current value get previous value
      if (current === "") {
          current = values[0];
      }
      if (current === undefined) {
          current = 0;
      }   
      
      return parseFloat(current);
   }
   
   //
   // keyboard shortcuts
   //
   $(window).on("keypress", function(e) {
        // get the character code of the key that was pressed       
        var getChar = e.which;
        // check if the enter key was presed/ if not convert to actual character
        if (getChar === 13) {
            getChar = "="
        } else {
            getChar = String.fromCharCode(getChar);
        }
        if (getChar === "/") {
            getChar = "divide";
        }
        // check if the input is a number
        if (/^\d$/.test(getChar)) {
            numeralInput(getChar);
        }else if (/\+|\-|\*/g.test(getChar) || getChar === "divide") {
            symbolInput(getChar);
        }else if (getChar === "=") {
            equalInput();
        }else if (getChar === "%") {
            percentInput();
        }else if (getChar === ".") {
            decimalInput();
        }



   });
  
   
});