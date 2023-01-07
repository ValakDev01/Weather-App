const input1 = document.querySelector('.in1')
const input2 = document.querySelector('.in2')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

//Duże litery bo zmienne stałe

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?lat=';

const API_LINK2 = '&lon=';

const API_KEY = '&appid=09b468dd72cc0adb72032061bddc6ad6';

const API_UNITS = '&units=metric';

const getWeather = () => {
    //Ustawiamy domyślną wartość, żeby nie zwracało błędu w konsoli

    const lat = input1.value || 51.509865;
 
    const lon = input2.value || -0.118092;

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} -> to jest to co na dole

    const URL = API_LINK + lat + API_LINK2 + lon + API_KEY + API_UNITS;

    axios.get(URL).then(res => {
        console.log(res.data);

        const temp = res.data.main.temp;
        //wilgotność powietrza
        const hum = res.data.main.humidity;

        //1 Sposób
        //console.log(res.data.weather[0].id);

        //2 Sposób
        //Zwraca nam niezagnieżdzony obiekt dzięki rest ...

        const status = Object.assign({}, ...res.data.weather);
        console.log(status.id);

        photo.setAttribute('src', './img/ice.png');

        weather.textContent = status.main;
        cityName.textContent = res.data.name;
        temperature.textContent = Math.floor(temp) + '°C';
        humidity.textContent = hum + '%';

        //czyści inputy i komunikat błędu za każdym razem gdy naciśniemy button

        warning.textContent = ''
        input1.value = ''
        input2.value = ''

        //Żeby przypisać odpowiednie id do odpowiedniej grafiki pogody to na stronie mamy coś takiego jak weather condition codes
        //https://openweathermap.org/weather-conditions
        
        if (status.id >= 200 && status.id < 300) {
            photo.setAttribute('src', './img/thunderstorm.png');
        } else if (status.id >= 300 && status.id < 500) {
            photo.setAttribute('src', './img/drizzle.png');
        } else if (status.id >= 500 && status.id < 600) {
            photo.setAttribute('src', './img/rain.png');
        } else if (status.id >= 600 && status.id < 701) {
            photo.setAttribute('src', './img/snow.png');
        } else if (status.id >= 701 && status.id < 800) {
            photo.setAttribute('src', './img/fog.png');
        } else if (status.id === 800) {
            photo.setAttribute('src', './img/sun.png');
        } else if (status.id >= 801 && status.id <= 804) {
            photo.setAttribute('src', './img/cloud.png');
        } else {
            photo.setAttribute('src', './img/unknown.png');
        }
    }).catch(() => warning.textContent = 'Wprowadzono błędne dane!')
}

//Żeby nie klikać buttona tylko nacisnąc Enter i ma działać.

const enterCheck = (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
}

input1.addEventListener('keyup', enterCheck);
input2.addEventListener('keyup', enterCheck);

button.addEventListener('click', getWeather);

getWeather();