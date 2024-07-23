const WEATHER_API_KEY = '391ee02dbfd71329f6f5e4ac7785acf8'; // Replace with your actual API key


let weather = {
    "apikey": WEATHER_API_KEY,
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => alert(error.message));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    },

    fetchWeatherByCoords: function(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="
            + lat
            + "&lon="
            + lon
            + "&units=metric&appid="
            + this.apikey)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => alert(error.message));
    },

    getCurrentLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            }, () => {
                alert("Geolocation not supported by this browser.");
            });
        } else {
            alert("Geolocation not supported by this browser.");
        }
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    weather.getCurrentLocation();
});
