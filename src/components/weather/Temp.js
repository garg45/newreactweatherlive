import React, { useState, useEffect } from 'react'
import './style.css'
import Weathercard from './WheatherCard';

const Temp = () => {
    const [search, setSearch] = useState('Mumbai');
    const [tempInfo, setTempInfo] = useState({});

    const getWeather = async () => {
        try {
            const SECRET_key = '9c6ddd829034c8b63902b05fe160b33f';
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${SECRET_key}`;
            const response = await fetch(url);
            const data = await response.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeather();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }}
                    />
                    <button
                        className="searchButton"
                        type="button"
                        onClick={getWeather}>
                        Search
                    </button>
                </div>
            </div>
            <Weathercard {...tempInfo} />
        </>
    )
}

export default Temp
