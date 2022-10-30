import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function FilterByName() {
  const { filters,
    handleFilterByName,
  } = useContext(PlanetContext);

  return (
    <input
      data-testid="name-filter"
      className="form-control mt-5"
      placeholder="Busca por nome:"
      type="text"
      onChange={ handleFilterByName }
      value={ filters.filterByName.name }
    />
  );
}
