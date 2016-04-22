$(document).ready(function() {
   var values = [];
   
   //format values for display
   function formatForDisplay(num) {
       //convert to string to format result
       num = num.toString();
       // if number is larger than display
       // convert to exponential notation
       if (num.toString().length > 16) {
           formatted = num.toPrecision(5);
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
    function calculateSqrt(num) {
        var result = Math.sqrt(num);
        // check if result is more than 13 chars
        // call function to shorten if needed
        return result;
    }  

    function calculatePercent(a, operator, b) {
        var result;
        // conver to decimal equivalent of percent
        b = b/100;
        if (symbol === "x" || symbol === "&divide;") {
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
        var multiplyOrDivide = false;
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
                operator = true;
                break;
            case "&divide;":
                result = value.first / value.second;
                operator = true;
                break;
        }// end switch
                
         if (value.places !== undefined) {
             result = convertToDec(result, multiplyOrDivide);
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
    function convertToInt(firstNum, SecondNum) {
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
        return {"first": parseInt(firstNum), "second": parseInt(SecondNum), "places": undefined}
    }    
    
    function convertToDec(num, decimalPlaces, multipyBoolean) {
        // if values are multiplied or divided just multipy that product/quotient by 10 to the n power twice
        // n = the number of decimal places in the orignal values
        if (multipyBoolean) {
            var powerMultiplier = (Math.pow(10, decimalPlaces) * Math.pow(10, decimalPlaces));
        }
        // if values are added or subtracted just multipy that sum/difference by 10 to the n power
        // n = the number of decimal places in the orignal values
        else {
            var powerMultiplier = Math.pow(10, decimalPlaces);
        }
        
        return num / powerMultiplier;
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
       current = current.replace(",", "");
       // get Value of button that was pressed
       var value = $(this).html();
       // update display with new number 
       if (current.length < 13) {
            if (/^0$/.test(current)) {
                $("#currentInput").text("");
            }
            $("#currentInput").append(value);
            
       }

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