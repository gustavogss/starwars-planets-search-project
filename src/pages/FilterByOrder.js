import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function FilterByOrder() {
  const {
    setFilteredPlanets,
    filteredPlanets,
  } = useContext(PlanetContext);

  const [sortOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [selectedSort, setSelectedSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  function handleClickOrder() {
    const { column, sort } = selectedSort;
    const planets = [...filteredPlanets];
    if (sort === 'ASC') {
      planets.sort((a, b) => a[column] - b[column]);
    }
    if (sort === 'DESC') {
      planets.sort((a, b) => b[column] - a[column]);
    }
    setFilteredPlanets(planets);
  }

  return (
    <div className="row mb-5">
      <h4 className="text-center mt-5">Ordenar por Coluna</h4>
      <select
        data-testid="column-sort"
        className="form-select col-sm"
        value={ selectedSort.column }
        onChange={ ({ target: { value } }) => (
          setSelectedSort({ ...selectedSort, column: value })
        ) }
      >
        { sortOptions.map((op) => <option key={ op }>{op}</option>)}
      </select>
      <div className="col-sm">
        <div className="form-check items-positions">
          <label htmlFor="radio-button">
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              className="form-check-input col-sm "
              id="radio-button"
              type="radio"
              name="choice"
              value="ASC"
              onClick={ ({ target: { value } }) => (
                setSelectedSort({ ...selectedSort, sort: value })
              ) }
            />
          </label>
          <label htmlFor="radio-button ml-2">
            Descendente
            <input
              data-testid="column-sort-input-desc"
              className="form-check-input col-sm"
              type="radio"
              id="radio-button"
              name="choice"
              value="DESC"
              onClick={ ({ target: { value } }) => (
                setSelectedSort({ ...selectedSort, sort: value })
              ) }
            />
          </label>
        </div>
      </div>
      <button
        data-testid="column-sort-button"
        className="btn btn-warning col-sm"
        type="button"
        onClick={ handleClickOrder }
      >
        Ordenar
      </button>
    </div>
  );
}
