const express= require("express");
const https= require("https");
const bodyParser= require("body-parser")

const app= express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html")})

app.post("/", function(req,res){

    const query= req.body.cityName;

    const app_id = "bd89c67f7a9e65d4f882cfd158ab4a0f";

    const unit= "metric";

    const url= "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ app_id + "&units=" +unit ;

    https.get(url, function(response){

        response.on("data", function(data){
           const weatherData= JSON.parse(data)
           const temp= weatherData.main.temp
           const weatherDescription= weatherData.weather[0].description
           const icon= weatherData.weather[0].icon
           const imgUrl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

           res.write("<h1>The temperature in your city is "+ temp + " degrees celcius.</h1>");
           res.write("<p>Weather description of your city is "+ weatherDescription +"</p>");
           res.write("<img src="+ imgUrl +">");
           res.send()
        })
 
    })})

app.listen(3000,function(){
    console.log("Server started at port 3000");
})