const express = require("express");
const hbs = require("hbs");
const request = require("requests");
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser");
const apikey = "3a9125c77b48ff205d4d0ca44b71a15d";
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('index')
})
// for searching cities
app.post('/postsubmit', (req, res) => {
    let city_input = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_input}&appid=${apikey}&units=metric`;
    request(url)
        .on("data", (chunk) => {
            const jsonObj = JSON.parse(chunk)
            if (jsonObj["cod"] == '404') {      //checking for error 
                res.render('index3')
            }
            else {
                // extracting data from API
                let temperature = jsonObj["main"]["temp"];
                let maxTemp = jsonObj["main"]["temp_max"];
                let minTemp = jsonObj["main"]["temp_min"];
                var risetime = new Date(jsonObj["sys"]["sunrise"] * 1000);
                let riseTimeString = risetime.toLocaleTimeString();
                var setTime = new Date(jsonObj["sys"]["sunset"] * 1000);
                let setTimeString = setTime.toLocaleTimeString();
                let weather = jsonObj["weather"][0]["main"];
                temperature.toString();
                res.render('index2', {
                    city: city_input.toLocaleUpperCase(),
                    temp: temperature,
                    tmax: maxTemp,
                    tmin: minTemp,
                    risetime: riseTimeString,
                    settime: setTimeString,
                    weather: weather
                })
            }

        })
});
// for popular cities 
app.get('/link/:city', (req, res) => {
    let city_input = req.params.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_input}&appid=${apikey}&units=metric`;
    request(url)
        .on("data", (chunk) => {
            // extracting data from API
            const jsonObj = JSON.parse(chunk)
            let temperature = jsonObj["main"]["temp"];
            let maxTemp = jsonObj["main"]["temp_max"];
            let minTemp = jsonObj["main"]["temp_min"];
            var risetime = new Date(jsonObj["sys"]["sunrise"] * 1000);
            let riseTimeString = risetime.toLocaleTimeString();
            var setTime = new Date(jsonObj["sys"]["sunset"] * 1000);
            let setTimeString = setTime.toLocaleTimeString();
            let weather = jsonObj["weather"][0]["main"];
            temperature.toString();
            res.render('index2', {
                city: city_input.toLocaleUpperCase(),
                temp: temperature,
                tmax: maxTemp,
                tmin: minTemp,
                risetime: riseTimeString,
                settime: setTimeString,
                weather: weather
            })

        })
});
app.listen(port, () => console.log('listening @', port))