console.log('Yeah javascript file is working');

var button1 = document.getElementById("add-button");



button1.addEventListener('mousedown',function()
{
   
    button1.style.boxShadow="0px 0px 5px 5px";
    
});

button1.addEventListener('mouseup',function()
{
   
    button1.style.boxShadow="0px 0px 0px 0px";
    
});