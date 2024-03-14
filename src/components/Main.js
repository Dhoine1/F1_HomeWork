import React from "react";
import axios from "axios";
import City from "./City.js";
import "../styles/Main.css";

function Main() {
    const obj = {"Москва": {"lat": "55.75", "lon": "37.61"}, 
                "Санкт-Петербург": {"lat": "59.93", "lon": "30.31"},
                "Екатеринбург": {"lat": "56.83", "lon": "60.60"},
                "Новосибирск": {"lat": "55.02", "lon": "82.92"},
                "Париж": {"lat": "48.85", "lon": "2.32"},
                "Сан-Франциско": {"lat": "37.77", "lon": "-122.41"},
                "Кейптаун": {"lat": "-33.92", "lon": "18.41"},
                "Пекин": {"lat": "39.90", "lon": "116,39"},
                "Лима": {"lat": "-12.06", "lon": "-77.03"},
                "Токио": {"lat": "35.68", "lon": "139.75"}};

    const handleClick = () => {
        const InputDiv = document.getElementById('cities');
        const OutputDiv = document.getElementById('output');
        let textWeather ="";
        let lat = obj[InputDiv.options[InputDiv.selectedIndex].text]["lat"];
        let lon = obj[InputDiv.options[InputDiv.selectedIndex].text]["lon"];
        let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&lang=ru&units=metric&&appid=5c54fb406f6195dc77f58219ffd224c8"
  
        axios.get(url).then((result) => {
            textWeather += "Температура: " + result['data']['main']['temp'] + '<sup>o</sup>C <br>'
            textWeather += "Ощущается как: " + result['data']['main']['feels_like'] + '<sup>o</sup>C <br>'
            textWeather += result['data']['weather'][0]['description'] + '<br>'
            textWeather += "Ветер " + result['data']['wind']['speed'] + 'm/c'
            OutputDiv.innerHTML = textWeather;
            });
    };

    const handleListClick = () => {
        const InputDiv = document.getElementById('cities');
        const OutputDiv = document.getElementById('output');
        let textWeather ="";
        let lat = obj[InputDiv.options[InputDiv.selectedIndex].text]["lat"];
        let lon = obj[InputDiv.options[InputDiv.selectedIndex].text]["lon"];
        let url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&lang=ru&units=metric&&appid=5c54fb406f6195dc77f58219ffd224c8";
   
        axios.get(url).then((result) => {
            textWeather += result['data']['list'][0]['dt_txt'].slice(0, 10) + '<br>';
            for (let i in result['data']['list']){
                let timeSlice = result['data']['list'][i]['dt_txt'].slice(11);
                if (timeSlice === '06:00:00') {
                    textWeather += result['data']['list'][i]['dt_txt'].slice(0, 10) + '<br>'
                    textWeather += "Температура утром: " + result['data']['list'][i]['main']['temp'] + '<sup>o</sup>C <br>';
                    textWeather += result['data']['list'][i]['weather'][0]['description'] + '<br>'
                    textWeather += "Ветер " + result['data']['list'][i]['wind']['speed'] + 'm/c <br>'
                } else if (timeSlice === '21:00:00') {
                    textWeather += "Температура вечером: " + result['data']['list'][i]['main']['temp'] + '<sup>o</sup>C <br>';
                    textWeather += result['data']['list'][i]['weather'][0]['description'] + '<br>'
                    textWeather += "Ветер " + result['data']['list'][i]['wind']['speed'] + 'm/c <br><br>'
                }
            }
            OutputDiv.innerHTML = textWeather;
        });
    }

    return (
        <main>
            <div>
                Выберите город:
            </div>
            <div>
            <select id='cities'>
                <City obj={obj}/>
            </select>  
            </div>
            <div>
                <button className="some-button" onClick={handleClick}>Текущая погода</button>
            </div>
            <div>
                <button className="some-button" onClick={handleListClick}>Погода на 5 дней</button>
            </div>
            <div id='output'></div>
        </main>
    )
};


export default Main;