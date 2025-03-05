import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import './styles/index.css'
import App from './components/App.tsx'
import { citySlice } from './citySlice.ts'
import locationsReducer from './locationsSlice';


const store = configureStore({
  
  reducer: {
    cityName : citySlice.reducer,
    locations: locationsReducer,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
