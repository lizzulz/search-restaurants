import axios from 'axios';
import { LatLngExpression} from 'leaflet';
import { LocationsType, LocationType } from '../types.ts'

export const fetchLocations = async (cityName : string) : Promise<LocationsType> =>  { 
      
      let fetchedLocations : LocationsType = {markers: [], mapCenter:[0,0]};

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=fast_food+in+${cityName}&format=json&limit=100`
        );
        const data = response.data;
        if (Array.isArray(data)) { //if the API response is good, then we call the callback function that is passed as a props
          const mcRestOnly : LocationType[] = data.filter ((loc) => loc.display_name.toLowerCase().includes("mcdonald"));
          const mcMarkersOnly = mcRestOnly.map((item)=>({
            lat: item.lat,
            lon: item.lon,
            display_name: item.display_name,
          }));

          const firstLocation = mcRestOnly[0];    //gets the first location to center the map
          const newCenter: LatLngExpression = [parseFloat(firstLocation.lat), parseFloat(firstLocation.lon)];

          fetchedLocations = {
            markers : mcMarkersOnly,
            mapCenter : newCenter,
          }                                  
        } else {
          console.error('API response does not match expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
      return fetchedLocations;
    };