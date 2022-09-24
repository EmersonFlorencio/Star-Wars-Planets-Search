import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsPlanetsContext from './ContextStarWarsPlanets';

const ENDPOINT = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planetsApi, setPlanetsApi] = useState([]);
  const [filtredResults, setFiltredResults] = useState([]);

  useEffect(() => {
    const getApiPlanets = async () => {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      const filterdata = data.results.map((info) => {
        delete info.residents;
        return info;
      });
      setPlanetsApi(filterdata);
      console.log(filterdata);
    };
    getApiPlanets();
  }, []);

  const contextValue = {
    planetsApi,
    filtredResults,
    setFiltredResults,
  };

  return (
    <starWarsPlanetsContext.Provider value={ contextValue }>
      {children}
    </starWarsPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
