import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import FilterByOrder from './FilterByOrder';

export default function FilterByNumericValues() {
  const {
    handleChange,
    selectedFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    setFilteredPlanets,
    data,
  } = useContext(PlanetContext);

  const [columnOptions, setColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const [comparisons] = useState([
    'maior que', 'menor que', 'igual a',
  ]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [usedColumns, setUsedColumns] = useState([]);

  function handleClickFilter() {
    selectedFilters();
    let columns = columnOptions;
    const removeColumn = filterByNumericValues.column;
    columns = columns.filter((col) => col !== removeColumn);
    setColumn(columns);
    if (!(removeColumn in usedColumns)) setUsedColumns([...usedColumns, removeColumn]);
    setActiveFilter(true);
    setFilterByNumericValues({ ...filterByNumericValues, column: columns[0] });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleClickFilter();
    }
  }

  function deleteFilter({ target }) {
    setFilteredPlanets(data);
    if (!(target.name in columnOptions)) setColumn([...columnOptions, target.name]);
    setUsedColumns(usedColumns.filter((col) => col !== target.name));
  }

  return (
    <section className="container mt-5">
      <div className="row">
        <h4 className="text-center">Filtrar por Características</h4>
        <select
          name="column"
          className="form-select col-sm"
          data-testid="column-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.column }
        >
          { columnOptions.map((op) => <option key={ op }>{op}</option>)}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          className="form-select col-sm"
          onChange={ handleChange }
          value={ filterByNumericValues.comparison }
        >
          { comparisons.map((op) => <option key={ op }>{op}</option>)}
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          className="form-control col-sm"
          onChange={ handleChange }
          onKeyPress={ handleKeyPress }
          value={ filterByNumericValues.value }
        />
        <button
          data-testid="button-filter"
          type="button"
          className="btn btn-success col-sm"
          onClick={ handleClickFilter }
        >
          Filtrar
        </button>
        <FilterByOrder />
      </div>
      <div className="btn mb-3">
        { activeFilter
          && usedColumns.map((col) => (
            <div key={ col } data-testid="filter" className="card-title mb-3">
              {col}
              <button
                className="btn btn-danger"
                type="button"
                onClick={ deleteFilter }
                name={ col }
              >
                X
              </button>
            </div>)) }
      </div>
    </section>
  );
}
