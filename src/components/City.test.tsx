import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import City from './City'; // Adjust the import according to your file structure
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { updateCity } from "../citySlice";


// Mock axios to return a predefined response for the city "Paris"
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create a mock store
const mockStore = configureStore({
    reducer: updateCity,
    
    preloadedState: {
      citySlice: {
        cityName: "New York", // Mock state
      },
    },
  });



describe('City Component', () => {
  it('displays "Paris" in the suggestions list after typing "paris"', async () => {
    // Mock response for the city "Paris"
    const mockResponse = {
      data: [
        { display_name: 'Paris, Ile-de-France, Metropolitan France, France' },
        { display_name: 'Paris, Lamar County, Texas, United States' },
        { display_name: 'Paris, Bourbon County, Kentucky, 40361, United States' },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    
    render(
        <Provider store={mockStore}>    
          <City />
        </Provider>
    );

    // Simulate user input for the city "Paris"
    const input = screen.getByLabelText(/Chercher un restaurant/i);
    fireEvent.change(input, { target: { value: 'Paris' } });

    // Wait for the suggestions to be fetched and displayed
    await waitFor(() => {
        const suggestionsList = screen.getByRole('list', { name: /suggestions/i });
        const suggestionsItems = within(suggestionsList).getAllByRole('listitem');
  
        // Assert that one of the suggestions contains "Paris"
        const parisSuggestion = suggestionsItems.find((item: HTMLElement) =>
          item.textContent?.includes('Paris')
        );
        expect(parisSuggestion).toBeInTheDocument();
      });
  });
});