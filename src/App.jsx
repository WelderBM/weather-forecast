import { useState, useRef} from 'react'
import './App.css'
import axios from 'axios'

import WeatherInformations from './components/WeatherInformations'
import WeatherInformationsFiveDays from './components/WeatherInformationsFiveDays'


function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const inputRef = useRef()

  async function searchCity (){

    const city = inputRef.current.value
    const key = "5eb6f9eaf9773eda9b1237ea655e327a"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`
    
    const apiInfo = await axios.get(url)
    const apiInfoFiveDays = await axios.get(urlFiveDays)

    console.log(apiInfoFiveDays);
    
    setWeather(apiInfo.data)
    setWeather5Days(apiInfoFiveDays.data)

  
  }

  return (
    <div className='container'>
      <h1>Previsão do tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformationsFiveDays weather5Days={weather5Days} />}
    </div>
  )
}

export default App
