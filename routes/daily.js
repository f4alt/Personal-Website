const express = require("express"),
      router = express.Router(),
      axios   = require('axios').default;

router.get('/daily', async function(req, res, next) {
  var beerImg, beerName, nasaImg, weatherNow;
  try {
    const beerResponse = await axios.get('https://sandbox-api.brewerydb.com/v2/beers/?key=4026c016f2f13351e303db0e84b250d9&hasLabels=Y&order=random');
    beerImg = beerResponse.data.data[0].labels.medium;
    beerName = beerResponse.data.data[0].name;
    const nasaResponse = await axios.get('https://api.nasa.gov/planetary/apod?api_key=bYXRULYwwmLd8wIEA41SAKas0AuvBC1CUXtalFet');
    nasaImg = nasaResponse.data.url;
    const weatherResponse = await axios.get('https://api.climacell.co/v3/weather/realtime?lat=27.5993&lon=-97.2366&location_id=&fields%5B%5D=temp&apikey=11OamvRbwH79qFVvlW5DoFWIcePZFWZn');
    weatherNow = weatherResponse;
  } catch(err) {
    console.log(err);
  }
  res.render("daily", {beerImg: beerImg, beerName: beerName, nasaImg: nasaImg});
  console.log(weatherNow.data.temp.value);
});

module.exports = router;
