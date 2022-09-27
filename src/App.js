import React from 'react';
// import './App.css';
import Provider from './Context/Provider';
import Table from './components/Table';
// import Filter from './components/Filter';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
