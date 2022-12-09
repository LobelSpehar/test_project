import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { dbStore } from 'stores';
import { APIUtils } from 'common/utilities';
import { FormInput } from 'components';
import { FormLayout } from 'layouts';

export const MakeForm = observer(({ observable = dbStore }) => {
  const { addItem, updateItem } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const schemaName = 'vehicleMake';

  const paramId = useParams().id;
  const navigate = useNavigate();

  const setItemAsDefault = (id) => {
    //get name and abrv from paramId to set as default
    let makesList = toJS(observable.makeList);
    let defaultData = makesList.find((item) => item.id === id);
    setName(defaultData.name);
    setAbrv(defaultData.abrv);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    //depending on paramId update or add new make
    if (paramId) {
      updateItem({ id: paramId, name: name, abrv: abrv }, schemaName);
      setTimeout(() => navigate('/home'), 200);
    } else {
      addItem({ id: paramId, name: name, abrv: abrv }, schemaName);
      setName('');
      setAbrv('');
    }
  };

  useEffect(() => {
    if (paramId) {
      setItemAsDefault(paramId);
    } else {
      setName('');
      setAbrv('');
    }
  }, [paramId]);

  return (
    <FormLayout submitHandler={onSubmit}>
      <FormInput inputValue={name} inputName={'Name'} onSetInput={setName} />
      <FormInput inputValue={abrv} inputName={'Abrv'} onSetInput={setAbrv} />
    </FormLayout>
  );
});
