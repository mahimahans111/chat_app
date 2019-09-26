//Make Connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var queries = [
   'How do I know my order is confirmed?',
   'Is there a minimum order value?',
   'Can I select food from multiple restaurants in a single order?',
   'Is Foodery App accountable for food quality and portion size?',
   'Can I place bulk/large quantity orders?'
];

var replies = [
   "A confirmation message is sent to your registered mobile number. If you've ordered through the app, you'll also get a push notification.",
   "In most cases, no. The minimum order amount is always indicated, or is seen on the restaurant page.",
   "You cannot select food from multiple restaurants in a single order. You can however place multiple orders, one each for a different restaurant.",
   "Bringing you the high quality from restaurants is of utmost importance to us. While it is for the restaurant to ensure food quality and standardise portion size, we proactively use your feedback to understand and partner with the best restaurants",
   "Yes, you can place bulk orders with us both from the app and the website."
];

//emit events

output.innerHTML+="<p>You can ask the following order related queries:<br>1. How do I know my order is confirmed?<br>2. Is there a minimum order value?<br>3. Can I select food from multiple restaurants in a single order?<br>4. Is Foodery App accountable for food quality and portion size?<br>5. Can I place bulk/large quantity orders?</p>"

btn.addEventListener('click', function(){
  socket.emit('chat',{
    message:message.value,
  });
  message.value="";
});

//Listen for addEventListener
socket.on('chat',function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p>'+data.message+'</p>';
  var me = 0;
  for(var i = 0; i < queries.length; i++){
    if(queries[i] == data.message){
      me = 1;
      output.innerHTML+='<p>'+replies[i]+'</p>';
    }
  }
  if(me === 0){
    output.innerHTML+='<p>'+'Sorry, Can you please enter a valid query?'+'</p>'
  }
});
