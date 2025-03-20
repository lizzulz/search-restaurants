import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationsType } from './types';
import { fetchLocations } from "./services/Locations";


// Define the initial state
interface LocationsState {
    value: LocationsType;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: LocationsState = {
    value: {
      markers: [],
      mapCenter: [48.8566, 2.3522], // Default center
    },
    status: 'idle',
    error: null,
  };

// Define an async thunk action creator
export const updateLocations = createAsyncThunk(
    'locations/updateLocations',
    async (cityName: string) => {
      const newLocations : LocationsType = await fetchLocations(cityName);
      return newLocations;
    }
  );

const locationsSlice = createSlice ({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(updateLocations.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateLocations.fulfilled, (state, action: PayloadAction<LocationsType>) => {
            state.status = 'succeeded';
            state.value = action.payload;
          })
          .addCase(updateLocations.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch locations';
          });
      },
});

export default locationsSlice.reducer;
