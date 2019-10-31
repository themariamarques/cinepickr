import React from 'react';
import FilmsList from './components/FilmsList';
import { FilmsProvider } from './context/Films';
import './App.css';

function App() {
  return (
    <FilmsProvider>
        <FilmsList/>
    </FilmsProvider>
  );
}

export default App;
