import { useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../main'



type MapProps = {
    selectedRestaurant: string;
    onSelectedRestaurantChange: (restaurant: string) => void;
};

type MapCenterProps = {
    center: LatLngExpression;
};

const MapUpdater: React.FC<MapCenterProps> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 15); // moves the map to the new location
      }, [center, map]);
    return null;
};





const Map = ({ selectedRestaurant, onSelectedRestaurantChange}: MapProps) => {

    
    const markers = useSelector((state: RootState)=> state.locations.value.markers);
    const mapCenter = useSelector((state: RootState)=> state.locations.value.mapCenter);

            
    const handleOnClick = (restaurant: string) => {
        if (selectedRestaurant !== restaurant) onSelectedRestaurantChange(restaurant);
    };


    return (
        <>
            <MapContainer 
                style={{ height: '100vh', width: '100%',  overflow: 'hidden' }}
                center={mapCenter} 
                zoom={16} 
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                />
                <MapUpdater center={mapCenter} />
                {markers && markers.map((loc, index) => (
                    <Marker key={index} position={[parseFloat(loc.lat), parseFloat(loc.lon)]}>
                        <Popup>{loc.display_name}
                            <br/>
                            <StyledButton type="button" onClick={()=>handleOnClick(loc.display_name)}>Choisir</StyledButton>
                        </Popup>
                    </Marker>
                ))}        
            </MapContainer>
        </>
    );

}; 

export default Map; 

const StyledButton = styled.button`
    position: relative;
    background: #F0C900;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    width: 60px;
    hight: 20px;
    top: 10px;
    margin-bottom: 10px;
    &:hover {
      background-color:rgb(179, 107, 0);
    }
  `;

