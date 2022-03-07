const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

fetch("https://api.meteo-concept.com/api/forecast/daily/0?token=05846fd5672aee81a298a4baf2acb8aa5d23085438af1e0befcfdff919d76104&insee=67482")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        const city = value.city.name;
        const tempMin = value.forecast.tmin;
        const tempMax = value.forecast.tmax;
        const weatherDiv = document.getElementById('weather-forecast');
        const forecast = document.createElement('div');
        forecast.classList.add('forecast');
        const weather = value.forecast.weather;

        const getDate = new Date;
        let day = days[ getDate.getDay() ];
        let month = months[ getDate.getMonth() ];
        

        let dayNumeric = getDate.getDate();
        
        if(dayNumeric > 3 && dayNumeric < 21) {
            dayNumeric = getDate.getDate() + 'th';
        } else if(dayNumeric == 3 || dayNumeric == 23) {
            dayNumeric = getDate.getDate() + 'rd';
        } else if(dayNumeric == 2 || dayNumeric == 22) {
            dayNumeric = getDate.getDate() + 'nd';
        } else if(dayNumeric == 1 || dayNumeric == 21 || dayNumeric == 31) {
            dayNumeric = getDate.getDate() + "st";
        }

        const date = day + ', ' + month +' '+ dayNumeric;

        let weatherIcon;
        
        if(weather == 0) {
            weatherIcon = '<image id="weather-icon" src="media/icons/sunny.png" alt="sunny" />';
        } else if(weather > 0 && weather < 4) {
            weatherIcon = '<image id="weather-icon" src="media/icons/cloudy.png" alt="cloudy" />';
        } else if(weather > 3 && weather < 6) {
            weatherIcon = '<image id="weather-icon" src="media/icons/clouds.png" alt="clouds" />';
        } else if( weather > 5 && weather < 10) {
            weatherIcon = '<image id="weather-icon" src="media/icons/fog.png" alt="fog" />';
        } else if(weather > 7 && weather < 12) {
            weatherIcon = '<image id="weather-icon" src="media/icons/rainy.png" alt="rainy" />';
        } else if(weather > 29 && weather < 42) {
            weatherIcon = '<image id="weather-icon" src="media/icons/rainy.png" alt="rainy" />';
        } else if(weather == 12) {
            weatherIcon = '<image id="weather-icon" src="media/icons/rain.png" alt="rain" />';
        } else if(weather > 78 && weather < 105) {
            weatherIcon = '<image id="weather-icon" src="media/icons/storm.png" alt="storm" />';
        } else if(weather > 104 && weather < 106) {
            weatherIcon = '<image id="weather-icon" src="media/icons/bolt.png" alt="bolt" />';
        } else if(weather > 219 && weather < 223) {
            weatherIcon = '<image id="weather-icon" src="media/icons/sunny.png" alt="snow" />';
        } else {
            weatherIcon = "";
        }

        forecast.innerHTML = `
            <h3 id="city">${date}</h3>
            <h2 id="temperature">${tempMax}° <span>${tempMin}°</span> ${weatherIcon}</h2>
        `;
        weatherDiv.append(forecast);
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
