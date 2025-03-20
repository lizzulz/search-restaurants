import axios from 'axios';
import styled from 'styled-components';
import React, { useRef, useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { updateCity } from '../citySlice';
import { updateLocations } from '../locationsSlice';
import { AppDispatch } from '../main'


type Item = {
  display_name: string;
};
  

const City: React.FC = () => {   
    const inputRef = useRef<HTMLInputElement>(null); //gets what is written in the actual input field
    const debounceRef = useRef<number | undefined>(undefined); //stores the timeout when typing a city name 
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const dispatch : AppDispatch = useDispatch();

    // searches for city suggestions while user is typing 
    const fetchCitySuggestions = useCallback(async (query: string) => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: query,
            format: 'json',
            limit: 5,
          },
        });
        const cityNames = response.data.map((item: Item) => item.display_name);
        setSuggestions(cityNames);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        return [] as string[];
      }
    }, []);

   

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = window.setTimeout(() => {
        if (value) {
          fetchCitySuggestions(value);
        } else {
          setSuggestions([]);
        }
      }, 300); // Debounce delay
    };

    const handleSuggestionClick = (newCityName: string) => {
      if (inputRef.current) {
        inputRef.current.value = newCityName;
      }
      setSuggestions([]);
      dispatch(updateCity(newCityName));
    };

    const handleInputFocus = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
        setSuggestions([]);
      }
    };

//gets the name of the city when user clicks on the search button or ENTERS the input field
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputRef.current) {
            const newCityName = inputRef.current.value;
            dispatch(updateCity(newCityName));
            dispatch(updateLocations(newCityName));         
        }
    };
    
    const isSubmitDisabled = inputRef.current ? !inputRef.current.value.trim() : true;

    return (
        <SearchBox>
            <StyledForm onSubmit={handleSubmit}>
                <StyledLabel htmlFor="city">Chercher un restaurant</StyledLabel>
                <StyledInput
                    type="text"
                    id="city"
                    ref={inputRef}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <StyledButton type="submit" disabled={isSubmitDisabled}>🔍</StyledButton>
                {suggestions.length > 0 && (
                  <SuggestionsList aria-label="suggestions">
                    {suggestions.map((suggestion, index) => (
                      <SuggestionsItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                      </SuggestionsItem>
                    ))}
                  </SuggestionsList>
                )}
                
            </StyledForm>
        </SearchBox>
    );
};
  
export default City;
  
  const SearchBox = styled.div`
    position: absolute;
    width: 300px;
    height: 71px;
    top: 16px;
    left: 70px;
    background: rgb(255 255 255 / 60%);
   /* filter: drop-shadow(0 4px 4px #000000);*/
    background-blur: 8;
    border-radius: 8px;
    border: 1px solid #ccc;
    z-index: 1000; /* Ensure the form appears above the map */
  `;

  // Define styled components
  const StyledForm = styled.form`
    
  `;
  
  const StyledLabel = styled.label`
    font-size: 14px;
    font: Inter;
    line-height: 16.94px;
    letf: 13px;
    top: 9px;
    color: black;
  `;
  
  const StyledInput = styled.input`
   position: relative;  
   font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 210px;
    height: 26px;
    left: 13px;
  `;
  
  const StyledButton = styled.button<{ disabled: boolean }>`
    position: relative;
    background-color: ${(props) => (props.disabled ? '#ccc' : '#F0C900')};
    border: none;
    border-radius: 8px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    margin: 3px;
    width: 26px;
    hight: 17px;
    left: 20px;
    &:hover {
       background-color: ${(props) => (props.disabled ? '#ccc' : '#b36b00')};
    }
  `;

  const SuggestionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 150px;
  overflow-y: auto;
  background: rgb(255 255 255 / 60%);
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  role: 'list';
  aria-label: 'suggestions';
`;

const SuggestionsItem = styled.li`
  padding: 2px;
  margin: 5px;
  cursor: pointer;
  background: rgb(255 255 255);
  border: 1px solid #ccc;
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;