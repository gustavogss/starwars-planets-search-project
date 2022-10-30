import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: { name: '' },
  });
  const [numericFilters, setNumericFilter] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'diameter',
    comparison: 'maior que',
    value: 10000,
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(URL).then((response) => response.json());
      results.forEach((e) => delete e.residents);
      const getKeys = Object.keys(results[0]);
      setData(results.sort((a, b) => a.name.localeCompare(b.name)));
      setKeys(getKeys);
    };

    fetchAPI();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const planets = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredPlanets(planets);
  }, [data, filters]);

  function handleFilterByName({ target: { value } }) {
    setFilter({ ...filters, filterByName: { name: value } });
  }

  function handleChange({ target: { value, name } }) {
    setFilterByNumericValues({ ...filterByNumericValues, [name]: value });
  }

  function selectedFilters() {
    const { column, comparison, value } = filterByNumericValues;
    let filtered = filteredPlanets;

    switch (comparison) {
    case 'maior que':
      filtered = filtered.filter((planet) => Number(planet[column]) > Number(value));
      break;
    case 'menor que':
      filtered = filtered.filter((planet) => Number(planet[column]) < Number(value));
      break;
    case 'igual a':
      filtered = filtered.filter((planet) => Number(planet[column]) === Number(value));
      break;
    default:
      filtered = filteredPlanets;
    }

    setFilteredPlanets(filtered);
    setNumericFilter([...numericFilters, filterByNumericValues]);
  }

  const contextValue = {
    data,
    setData,
    keys,
    filters,
    filteredPlanets,
    handleFilterByName,
    handleChange,
    selectedFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    numericFilters,
    setFilteredPlanets,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
