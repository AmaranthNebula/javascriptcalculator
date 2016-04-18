$(document).ready(function() {
   var values = [];
   
   function updateDisplay() {
       
   }
   
   function calculate(string) {
       
       
       
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
   });
   //
   //             FINISH
   //when a mathematical symbol is clicked
   $(".symbol").click(function(e){
      e.preventDefault();
      var value = $(this).html();
      console.log(value); 
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