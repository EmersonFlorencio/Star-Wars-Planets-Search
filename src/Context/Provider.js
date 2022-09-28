import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import starWarsPlanetsContext from './ContextStarWarsPlanets';

const ENDPOINT = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planetsApi, setPlanetsApi] = useState([]);
  const [filters, setFilters] = useState({});
  const [name, setName] = useState('');
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
    };
    getApiPlanets();
  }, []);

  useEffect(() => {
    const filteredPlanetsByNames = planetsApi.filter((planetName) => planetName.name
      .toLowerCase().includes(name.toLowerCase()));
    setFiltredResults(filteredPlanetsByNames);
    console.log(filteredPlanetsByNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  function valueComparator(inputValue, value, comparison) {
    switch (comparison) {
    case 'igual a':
      return Number(inputValue) === Number(value);

    case 'menor que':
      return Number(inputValue) < Number(value);

    case 'maior que':
      return Number(inputValue) > Number(value);

    default:
      return false;
    }
  }

  const filteredPlanets = planetsApi
    .filter((planet) => Object.entries(filters)
      .every(([column, filter]) => valueComparator(planet[column],
        filter.value, filter.comparison)));
  console.log(filteredPlanets);

  useEffect(() => {
    setFiltredResults(filteredPlanets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function filterByInput() {
    setFiltredResults(filteredPlanets);
  }

  function filterByNumericValue(column, comparison, value) {
    setFilters({
      ...filters,
      [column]: {
        comparison,
        value,
      },
    });
  }

  function filterByName(payload) {
    setName(payload);
  }

  const contextValue = {
    planetsApi,
    filtredResults,
    filterByName,
    name,
    filters,
    filteredPlanets,
    filterByInput,
    filterByNumericValue,
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
