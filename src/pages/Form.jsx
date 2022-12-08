import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { APIUtils } from 'common/utilities';
import { ErrorMsg, FormSelect, FormInput } from 'components';
import { FormLayout } from 'layouts';

export const Form = observer(({ observable, schemaName }) => {
  const { addItem, fetchAllMakes, getItemById, updateItem } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [make, setMake] = useState('');
  const [error, setError] = useState('');
  const isModel = schemaName === 'vehicleModel';
  const paramId = useParams().id;
  const navigate = useNavigate();

  const getData = async (id) => {
    const res = await getItemById(id, schemaName);
    setName(res.name);
    setAbrv(res.abrv);
    const makeExists = await observable.getItemById(res.makeId)[0];
    if (makeExists) {
      setMake(makeExists.id);
      setError('');
    } else if (isModel) {
      setError(`Make does not exist`);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isModel) {
      if (paramId) {
        updateItem(
          { id: paramId, name: name, abrv: abrv, makeId: make },
          schemaName
        );
        setTimeout(() => navigate('/models'), 200);
      } else {
        addItem(
          { id: paramId, name: name, abrv: abrv, makeId: make },
          schemaName
        );
      }
    } else {
      if (paramId) {
        updateItem({ id: paramId, name: name, abrv: abrv }, schemaName);
        setTimeout(() => navigate('/makes'), 200);
      } else {
        addItem({ id: paramId, name: name, abrv: abrv }, schemaName);
      }
    }

    setName('');
    setAbrv('');
    setMake('');
  };

  useEffect(() => {
    if (isModel) {
      fetchAllMakes(observable);
    }
    if (paramId) {
      getData(paramId);
    } else {
      setName('');
      setAbrv('');
      setMake('');
    }
  }, [observable]);

  return (
    <FormLayout submitHandler={onSubmit}>
      <FormInput inputValue={name} inputName={'Name'} onSetInput={setName} />
      <FormInput inputValue={abrv} inputName={'Abrv'} onSetInput={setAbrv} />
      {isModel ? (
        <FormSelect
          value={make}
          onSelect={setMake}
          options={observable?.data.list}
        />
      ) : null}
      <ErrorMsg msg={error} />
    </FormLayout>
  );
});