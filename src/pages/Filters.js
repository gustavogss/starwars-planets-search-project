import React from 'react';
import FilterByNumericValues from './FilterByNumericValues';
import FilterByName from './FilterByName';

export default function Filter() {
  return (
    <section className="container">
      <FilterByName />
      <FilterByNumericValues />
    </section>
  );
}
