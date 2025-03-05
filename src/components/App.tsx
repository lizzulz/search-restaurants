import Map from './Map.tsx'
import City from './City.tsx'
import Footer from './Footer.tsx'
import React, { useState } from 'react';

import styled from 'styled-components';

const App: React.FC = () => {

  // const [cityName, setCityName] = useState(''); //I need the city to be shared betweek City and Map

  // const handleCityNameChange = (name: string) => {
  //   setCityName(name);
  // };

  const [selectedRestaurant, setSelectedRestaurant] = useState(''); //I need the selected restaurant to be shared betweek Map and Footer

  const handleSelectedRestaurantChange = (restaurant: string) => {
    setSelectedRestaurant(restaurant);
  };
  
  return (
    <>
      <div>
        <MainContainer>
          {/* <City cityName={cityName} onCityNameChange={handleCityNameChange} /> */}
          {/* <Map cityName={cityName} selectedRestaurant={selectedRestaurant} onSelectedRestaurantChange= {handleSelectedRestaurantChange} /> */}
          <City />
          <Map selectedRestaurant={selectedRestaurant} onSelectedRestaurantChange= {handleSelectedRestaurantChange} />
          <Footer selectedRestaurant={selectedRestaurant}/>
        </MainContainer>
      </div>   
    </>
  );
};

export default App;

// Define a styled container
const MainContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;