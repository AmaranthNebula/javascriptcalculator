$(document).ready(function() {
   var values = [];
   var equalClicked = false;
   var memory;
   
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
            while (pos > 0) {
                num.splice(pos, 0, ",");
                pos -= 3; 
            }
            num =num.join("");
       }
       
       return num;
   }
   
   //
   //calcuation functions
   //
    function calculatePercent(a, operator, b) {
        var result;
        // conver to decimal equivalent of percent
        b = b/100;
        if (symbol === "x" || symbol === "divide") {
            result = calculate(a, operator, b);
        }
        else {
            //if the percentage is added or subtracted from a value:
            // first find the percentage result of a and then add/subtract that 
            //value from the original a
            result = calculate(a, "x", b);
            result = calculate(a, operator, b);
        }
        
        return result;
    }

    // pass two numbers (can be string) and an arithmetic operator
    // perform calculation based on arithmetic operator    
    function calculate (firstNum, operator, secondNum) {
        // if multiplying or dividing two numbers that are both decimals
        // to convert back to Decimals, divide by 10 to the power of decimal places twice
        var squareDecimalPlaces = ((operator === "x" || operator === "divide") && firstNum.toString().includes(".") && secondNum.toString().includes("."));
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
       //remove all commas in GUI formatted value
       current = current.replace(/\,/g, "");
       // get Value of button that was pressed
       var value = $(this).html();
       // update display with new number 
       if (current.length < 15) {
           
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

   });
   //
   //     

   //when a mathematical symbol is clicked
   $(".symbol").click(function(e){
      e.preventDefault();
      var result;
     if ($(this).is("#buttonDivide")) {
         var operator = "divide";
     }else {
      var operator = $(this).html();
     }
       //get current values from GUI
       var current = $("#currentInput").text();
       //remove formatting
       current = current.replace(/\,/g, "");

        //DEBUGGING CODE
       console.log( values[0] + " " + values[1] +" " + current + " " + operator);
       // for the first value inputted: save values to array
       if (values[0] === undefined) {
           values.push(current);
           values.push(operator);
           updateDisplay("", formatForDisplay(current) + " " + operator);
       }else if (current === "") {
           values[1] = operator;
           updateDisplay("", formatForDisplay(values[0]) + " " + operator)
       }else {
           result = calculate(values[0], values[1], current);
           //assign new values to array
           values[0] = result;
           values[1] = operator;
           result = formatForDisplay(result);
           updateDisplay("", result + " " + operator);

       } 
        
   });
   
   $("#buttonSqrt").click(function(e) {
       
   });
   $("#buttonPercent").click(function(e) {
       
   });
   $("#buttonEqual").click(function(e){
       var current = $("#currentInput").text();
              //get current values from GUI
       var current = $("#currentInput").text();
       //remove formatting
       current = current.replace(/\,/g, "");
       
       if (values[0] === undefined || current === ""){
           updateDisplay(current, "");
       }
       else {
           result = calculate(values[0], values[1], current);
           result = formatForDisplay(result);
           updateDisplay(result, "");
       }
        //clear array
        values = [];
        equalClicked = true;
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