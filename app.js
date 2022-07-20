const bodyParser = require("body-parser");
const express = require("express"); //using express
const https = require("https"); //using http module
const app = express();

//to get the data from website that was input
app.use(bodyParser.urlencoded({ extended: true })); 

//main page of index.html
app.get("/", function (req, res) {
  
  res.sendFile(__dirname + "/index.html");
});

//Post method that will respond to the form of index.html
app.post("/", function (req, res) {
  //console.log(req.body.city);

  const query = req.body.city;
  const appid = "THE API KEY GENERATED, USE THAT HERE";
  const units = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    appid;
   
      
  https.get(url, function (response) {
    //from the url getting statusCode
    console.log(response.statusCode);

    response.on("data", function (data) {
      //getting whole data as JSON format
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

       //Converting back data into strings
      //console.log(JSON.stringify(weatherData));      

      //view jason viewer extension to see all the json format 
      const temp = weatherData.main.temp;
      const feel_like = weatherData.main.feels_like;
      const pressure = weatherData.main.pressure;
      const humidity = weatherData.main.humidity;
      const wind_speed = weatherData.wind.speed;
      const country = weatherData.sys.country;
      const city = weatherData.name;
      const timezone = weatherData.timezone;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //only one res.send can be used but many write calls
      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " Degree Celsius.</h1>"
      );
      res.write("<img src=" + icon_url + " >");
      res.write(
        "<h2>The pressure is " +
          pressure +
          " Pa, humidity is " +
          humidity +
          " g/m3 and the windspeed is " +
          wind_speed +
          " m/s. </h2>"
      );

      //only one send call for all write calls
      res.send();
    });
  });
});

app.listen(3000, function () {
  //our local host 3000
  console.log("server is running.");
});
