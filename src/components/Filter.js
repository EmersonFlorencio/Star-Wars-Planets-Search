import React, { useContext, useState } from 'react';
import starWarsPlanetsContext from '../Context/ContextStarWarsPlanets';

function Filter() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const { filters,
    name,
    filterByName,
    filterByNumericValue,
    // filterByInput,
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

    const validColumn = column || validColumns[0];
    console.log(validColumn);

    filterByNumericValue(validColumn, comparison, value);
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
          value={ column }
          onChange={ (event) => setColumn(event.target.value) }
        >
          {validColumns.map((validColumn) => (
            <option key={ validColumn } value={ validColumn }>{validColumn}</option>
          ))}
        </select>

        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ (event) => setComparison(event.target.value) }
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
          value={ value }
          onChange={ (event) => setValue(Number(event.target.value)) }
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
