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

app.post('/postsubmit', (req, res) => {
    let cityo = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityo}&appid=${apikey}&units=metric`;
    request(url)
        .on("data", (chunk) => {
            const jsobj = JSON.parse(chunk)
            if (jsobj["cod"] == '404') {
                res.render('index3')
            }
            else {
                let tempo = jsobj["main"]["temp"];
                let tmaxo = jsobj["main"]["temp_max"];
                let tmino = jsobj["main"]["temp_min"];
                var risetimeo = new Date(jsobj["sys"]["sunrise"] * 1000);
                let risetimeoo = risetimeo.toLocaleTimeString();
                var settimeo = new Date(jsobj["sys"]["sunset"] * 1000);
                let settimeoo = settimeo.toLocaleTimeString();
                let weathero = jsobj["weather"][0]["main"];
                tempo.toString();
                res.render('index2', {
                    city: cityo.toLocaleUpperCase(),
                    temp: tempo,
                    tmax: tmaxo,
                    tmin: tmino,
                    risetime: risetimeoo,
                    settime: settimeoo,
                    weather: weathero
                })
            }

        })
});
app.get('/link/:city', (req, res) => {
    let cityo = req.params.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityo}&appid=${apikey}&units=metric`;
    request(url)
        .on("data", (chunk) => {
            const jsobj = JSON.parse(chunk)
            let tempo = jsobj["main"]["temp"];
            let tmaxo = jsobj["main"]["temp_max"];
            let tmino = jsobj["main"]["temp_min"];
            var risetimeo = new Date(jsobj["sys"]["sunrise"] * 1000);
            let risetimeoo = risetimeo.toLocaleTimeString();
            var settimeo = new Date(jsobj["sys"]["sunset"] * 1000);
            let settimeoo = settimeo.toLocaleTimeString();
            let weathero = jsobj["weather"][0]["main"];
            tempo.toString();
            res.render('index2', {
                city: cityo.toLocaleUpperCase(),
                temp: tempo,
                tmax: tmaxo,
                tmin: tmino,
                risetime: risetimeoo,
                settime: settimeoo,
                weather: weathero
            })

        })
});
app.listen(port, () => console.log('listening @', port))