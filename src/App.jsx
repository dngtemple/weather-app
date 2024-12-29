import { useRef, useState } from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import './App.css'

import { MdAutoGraph } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { MdWindPower } from "react-icons/md";


import useFetchCities from "./hooks/useFetchCities.js"
import useWeather from './hooks/useWeather.js';

function App() {


  let [input,setinput]=useState("");
  let [city,setcity]=useState("")


  const {data,loading}=useFetchCities(input)
  const {dataa,loadingg}=useWeather(city)

  console.log(dataa,loadingg);


  

  return (
    <>
      <div className=' bg-slate-400 w-full h-lvh flex justify-center items-center' >
       {/* <video autoPlay muted loop src='./video1.mp4' height="100%" width="100%">
       </video> */}

       <img src='./picture1.jpg' className='w-full h-full animate-zoom'/>

       <div className='bg-transparent flex flex-col justify-between h-4/5 z-10 absolute w-3/5'>
         <div className='bg-transparent w-full h-44 flex flex-col justify-center items-center'>
         <label class="input input-sm input-bordered flex items-center gap-1 w-full sm:w-3/5">
          <input onChange={(e)=>{
            setinput(e.target.value);
          }}  type="text" class="grow" placeholder="Search city or country" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70 text-black">
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
         </label>

         {input !== "" && (
              <ul className="menu menu-xs bg-base-200 rounded-box w-full sm:w-3/5">
                {loading ? (
                  <li>Loading...</li>
                ) : data.length > 0 ? (
                  data.map((city, index) => (
                    <li onClick={function(){
                      setcity(city.name)
                    }} key={index}>
                      <a>{city.name} {city.state} , {city.country}</a>
                    </li>
                  ))
                ) : (
                  <li>No results found</li>
                )}
              </ul>
            )}
        
         </div>


         <div className='w-full h-20 flex text-white flex-col items-center justify-center'>

          {
            loadingg?(
              <span class="loading loading-dots loading-lg"></span>
            ):
            <h1 className='text-5xl'>{city}</h1>
            
          }
          <h3 className='text-3xl'>{dataa?.main?.temp}°C</h3>
          <h3 className="text-2xl sm:text-5xl">
          {dataa?.weather && dataa.weather.length > 0 ? dataa.weather[0]?.description : "No weather data"}
        </h3>


         </div>




         <div className='w-full h-40  flex justify-between sm:justify-around'>


          {
            loadingg?(
              <span class="loading loading-ring loading-lg"></span>
            ):
            <div className='w-32 h-4/5 flex text-white flex-col items-center justify-center  rounded'>
            <MdAutoGraph className='text-6xl'/> 
            <h4>{dataa?.main?.feels_like}°C</h4>
            <p>Feels like</p>
           </div>
          }

          {
            loadingg?(
              <span class="loading loading-ring loading-lg"></span>
            ):
            <div className='w-32 h-4/5 text-white flex flex-col items-center justify-center rounded'>
           <WiHumidity className='text-6xl'/> 
           <h4>{dataa?.main?.humidity}%</h4>
           <p>Humidity</p>
          </div>
          }

          {
            loadingg?(
              <span class="loading loading-ring loading-lg"></span>
            ):
            <div className='w-32 h-4/5 text-white flex flex-col items-center justify-center rounded'>
           <MdWindPower className='text-6xl'/> 
           <h4>{dataa?.wind?.speed}km/h</h4>
           <p>Wind</p>
          </div>
            
          }

         </div>

        

         
       </div>

      </div>
    </>
  )
}

export default App
