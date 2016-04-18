$(document).ready(function() {
   var currentIndex = 0;
   var values = [];
   
   function updateDisplay() {
       
   }
   
   function calculate(string) {
       
       
       
   }
   
   
   //event handlers
   $(".button").click(function(e) {
       e.preventDefault();
       var value = $(this).html();
       //value = "23+2";
         console.log(value);    
       if (/!\d/g.test(value)) {
           console.log("NUMBER");
       }
 
   });

   
   
    
});