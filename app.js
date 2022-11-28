const express=require('express');
const https=require("https");
const bodyParser=require("body-parser");


const app= express();
app.use(bodyParser.urlencoded( {extended:true} ));


app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");

  //res.send("Server is up and running.");
});

app.post("/", function(req,res){

  const query =req.body.cityName;
  const apiKey="b998f6082d4edf80937baf6d98ee27cf";
  const unit="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit+"";

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data); // Parsea de hexadecimal a Json 
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
      console.log(imageURL);
      res.write("<p>The weather is currently "+weatherDescription+"<p>");
      res.write("<h1>Te temperature in "+query+" is "+temp+" degrees celcius</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});




app.listen(3000,function(){
  console.log("Server is connected to port 3000");
});
