import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { dbStore } from 'stores';
import { APIUtils } from 'common/utilities';
import { FormInput } from 'components';
import { FormLayout } from 'layouts';

export const MakeForm = observer(({ observable = dbStore }) => {
  const { addItem, updateItem, findById } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const schemaName = 'vehicleMake';

  const paramId = useParams().id;
  const navigate = useNavigate();

  //empty all form fields
  const clearForm = () => {
    setName('');
    setAbrv('');
  };

  //get name and abrv from paramId to set as default
  const setItemAsDefault = async (id) => {
    let defaultData = toJS(observable.getMakeById(id));
    if (!defaultData) {
      defaultData = await findById(id, schemaName);
    }
    setName(defaultData.name);
    setAbrv(defaultData.abrv);
  };

  //add make, or update if it already has id
  const onSubmit = (e) => {
    e.preventDefault();

    if (paramId) {
      updateItem({ id: paramId, name: name, abrv: abrv }, schemaName, () => {
        navigate('/home');
      });
    } else {
      addItem({ id: paramId, name: name, abrv: abrv }, schemaName);
      clearForm();
    }
  };

  useEffect(() => {
    if (paramId) {
      setItemAsDefault(paramId);
    } else {
      clearForm();
    }
  }, [paramId]);

  return (
    <FormLayout submitHandler={onSubmit}>
      <FormInput inputValue={name} inputName={'Name'} onSetInput={setName} />
      <FormInput inputValue={abrv} inputName={'Abrv'} onSetInput={setAbrv} />
    </FormLayout>
  );
});
