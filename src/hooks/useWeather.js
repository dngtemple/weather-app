import React, { useEffect, useState } from 'react'


export default function useWeather(query) {
  const [loadingg, setLoading] = useState(true);
    const [dataa, setData] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY; 
  
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchWeather();
    }, [apiKey,query]); // Dependency array includes `apiKey`
  
    return { dataa, loadingg };
}
