// check if user included a string
module.exports = function(userString){
  var serverTime = {
      'unix': null,
      'natural': null
    },
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
      naturalRegex = new RegExp('[a-z]{3,8}\\s{1}[0-9]{1,2},\\s{1}[0-9]{4}','i');
  if(userString){
    if(!isNaN(userString)){
      // was a unix time string
      serverTime.unix = +userString;
      console.log("Received request for time stamp from UNIX time string\n %s", userString);
      var date = new Date(userString * 1000),year = date.getFullYear(),month = months[date.getMonth()],day = date.getDate();
      var naturalString = month + ", " + day + " " + year;
      serverTime.natural = naturalString;
      console.log("Sending time stamp object\n %s", JSON.stringify(serverTime));
      return serverTime;
    }else{
      // was a natural time string
      console.log("Received request for time stamp from NATURAL time string\n %s", userString);
      if(userString.match(naturalRegex)){
        serverTime.natural = userString;
        serverTime.unix = +new Date(userString) / 1000;
        console.log("Sending time stamp object\n %s", JSON.stringify(serverTime));
        return serverTime;
      }else{
        console.log("Error, Received bad request. INVALID NATURAL time string format\n %s", userString);
        return null;
      }
    }
  }else{
   console.log("Error, Received request on /api with NO STRING SUPPLIED\n");
   return serverTime;
  }
};
