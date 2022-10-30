import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const { filteredPlanets, keys } = useContext(PlanetContext);
  return (
    <table className="table table-dark">
      <thead className="thead-dark">
        <tr>
          { keys.map((key) => <th key={ key }>{key}</th>) }
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">
              {planet.name}
            </td>
            { keys.filter((key) => key !== 'name')
              .map((key) => <td key={ key }>{planet[key]}</td>)}
          </tr>
        )) }
      </tbody>
    </table>
  );
}
