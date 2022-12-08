import React, { useEffect, useState } from 'react';

import { APIUtils } from 'common/utilities';
import { observer } from 'mobx-react-lite';

export const Form = observer(({ observable, schemaName }) => {
  const { addItem, fetchAllMakes } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [make, setMake] = useState('');
  const isModel = schemaName === 'vehicleModel';
  useEffect(() => {
    if (isModel) {
      fetchAllMakes(observable);
    }
  }, [observable]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isModel) {
      addItem({ id: null, name: name, abrv: abrv, makeId: make }, schemaName);
    } else {
      addItem({ id: null, name: name, abrv: abrv }, schemaName);
    }
    console.log({ id: null, name: name, abrv: abrv, make: make }, schemaName);
    setName('');
    setAbrv('');
    setMake('');
  };
  return (
    <form onSubmit={onSubmit}>
      {isModel ? (
        <>
          <label>Make</label>
          <br />
          <select
            value={make}
            required
            onChange={(e) => setMake(e.target.value)}
          >
            <option value='' hidden>
              Select make
            </option>
            {observable?.data.list.map((make) => (
              <option key={make.id} value={make.id}>
                {make.name}
              </option>
            ))}
          </select>
          <br />
        </>
      ) : null}
      <label htmlFor={'name'}>Name</label>
      <br />
      <input
        required
        id={'name'}
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <br />
      <label htmlFor={'abrv'}>Abrv</label>
      <br />
      <input
        required
        id={'abrv'}
        value={abrv}
        onChange={(e) => setAbrv(e.target.value)}
      ></input>
      <br />

      <button>Submit</button>
    </form>
  );
});
