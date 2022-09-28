import React, { useContext, useState } from 'react';
import starWarsPlanetsContext from '../Context/ContextStarWarsPlanets';

function Filter() {
  const [filterValue, setFilterValue] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const { filters,
    name,
    filterByName,
    filterByNumericValue,
  } = useContext(starWarsPlanetsContext);

  const validColumns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']
    .filter((validColumn) => filters[validColumn] === undefined);

  function handleName(event) {
    filterByName(event.target.value);
  }

  function handleFilter(event) {
    event.preventDefault();
    if (validColumns.length === 0) return;

    const validColumn = filterValue.column ? filterValue.column : validColumns[0];

    console.log(validColumn);

    filterByNumericValue(validColumn, filterValue.comparison, filterValue.value);
    setFilterValue({ ...filterValue,
      column: 'population' });
  }

  return (
    <section>
      <form onSubmit={ handleFilter }>
        <input
          data-testid="name-filter"
          type="text"
          id="name-filter"
          name="name"
          onChange={ handleName }
          value={ name }
        />

        <select
          id="column-filter"
          data-testid="column-filter"
          name="column"
          value={ filterValue.column }
          onChange={ ({ target }) => setFilterValue({ ...filterValue,
            column: target.value }) }
        >
          {validColumns.map((validColumn) => (
            <option key={ validColumn } value={ validColumn }>{validColumn}</option>
          ))}
        </select>
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          value={ filterValue.comparison }
          onChange={ ({ target }) => setFilterValue({ ...filterValue,
            comparison: target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          name="value"
          value={ filterValue.value }
          onChange={ ({ target }) => setFilterValue({ ...filterValue,
            value: target.value }) }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </section>
  );
}

export default Filter;
