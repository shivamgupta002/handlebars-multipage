import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Template1 from './Template1/Template1';


const HomePage = () => {
  const { username } = useParams();

   const [inputs, setInputs] = useState({});

  useEffect(() => {
        const fetchHandler = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/data/${username}`
            );
            const data = response.data;
            setInputs(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchHandler();
      }, [username]);
      console.log(inputs);
      
  return (
    <>
      <Template1 data={inputs}/>
    </>
  )
}

export default HomePage;



