import React from 'react';
import './App.css';
import Table from './pages/Table';
import Filters from './pages/Filters';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <>
      <h1 className="text-center">Projeto Start Wars - Trybe</h1>
      <PlanetProvider>
        <Filters />
        <Table />
      </PlanetProvider>
    </>
  );
}

export default App;
