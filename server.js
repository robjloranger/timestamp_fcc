// server.js
//

var express = require('express'), app = express(), PORT = (process.env.PORT || 8080), timeMe = require('./app/time.js');
app.use(express.static(__dirname + '/public'));
app.use(function(request,response,next){
  if(request.path === "/" || request.path === "/api"){
    next();
  }else{
    response.status(404).json("Path requested does not exist. Please visit http://robsfcctimestamps.herokuapp.com/ for more information.");
  }
});
app.get('/api', function(request,response){
  var result = timeMe(request.query.time);
  if(result !== null){
    if(result.unix === null || result.natural === null){
      response.send(result);
    }else{
      response.send(result);
    }
  }else{
    response.status(400).json("Bad request, the string provided was not a valid natural date string or no string was provided. Please refer to the api documentation at http://robsfcctimestamps.herokuapp.com/");
  }
});

app.listen(PORT, function(){
  console.log("server running on port %s\n",PORT);
});
