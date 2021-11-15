const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
const port = 3000; 
app.use(bodyParser.urlencoded({extended:true}));
//Their is only one res.send() in the method of get method
//But have res.write() is multiple in the get method
app.get("/", function (req, res) {
  
  res.sendFile(__dirname+"/index.html");
  
});
app.post("/",function(req,res){
  
  const query=req.body.cityName;
  const apiKey="5cbe1c4436ab0e15be457729cfc3799a";
  const unit="metrics";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
  https.get(url, function (response) {
    //This is the statusCode=200
    console.log(response.statusCode);
    //This is for data send in the browser
    response.on("data", function (data) {
      const wheatherData = JSON.parse(data);
      //convert hexadecimal to text by the help of JSON.parse(data)
      //This is the temperature ,Description and icon image
      const temp = wheatherData.main.temp;
      const Desc = wheatherData.weather[0].description;
      const icon = wheatherData.weather[0].icon;
      //This is image url
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //This is wheather description rs.write()
      res.write("<p>Wheather Description " + Desc + " in London<p>");
      //This is temperature rs.write()
      res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celcius</h1>");
      //This is image rs.write()
      res.write("<img src= " + imageURL + " >");
      res.send();
    });
  });
  
});

  

app.listen(port, function () {
  console.log("Server is running at port 3000");
});
