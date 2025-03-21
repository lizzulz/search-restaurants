import Map from './Map.tsx'
import City from './City.tsx'
import Footer from './Footer.tsx'
import { useState } from 'react';

import styled from 'styled-components';

const App = () => {

  const [selectedRestaurant, setSelectedRestaurant] = useState(''); //I need the selected restaurant to be shared betweek Map and Footer

  const handleSelectedRestaurantChange = (restaurant: string) => {
    setSelectedRestaurant(restaurant);
  };
  
  return (
    <>
      <div>
        <MainContainer> 
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
  width:99%;
  height: 100vh;
  margin: 5px;
  overflow: hidden;
`;