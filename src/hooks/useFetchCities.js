import { useState, useEffect } from "react";

export default function useFetchCities(query) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY; 

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
        );
        const cities = await response.json();
        console.log(cities);
        setData(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [apiKey,query]); // Dependency array includes `apiKey`

  return { data, loading };
}
