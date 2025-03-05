// to be used in the state of the cityName Redux store
import { LatLngExpression } from 'leaflet';


export type LocationType = {
    lat: string;
    lon: string; 
    display_name: string;
};

export type LocationsType = {
  markers: LocationType[];
  mapCenter: LatLngExpression;
}
    

export interface AppState {
    cityName: string;
    locations: LocationsType;      
  }

  
  


