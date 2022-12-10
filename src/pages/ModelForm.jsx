import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { dbStore } from 'stores';
import { APIUtils } from 'common/utilities';
import { ErrorMsg, FormInput, FormSearchResults } from 'components';
import { FormLayout } from 'layouts';

export const ModelForm = observer(({ observable = dbStore }) => {
  const { addItem, updateItem, searchByNameAndAbrv, findById } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [make, setMake] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [error, setError] = useState('');
  const schemaName = 'vehicleModel';

  const paramId = useParams().id;
  const navigate = useNavigate();

  //empty all form fields
  const clearForm = () => {
    setName('');
    setAbrv('');
    setMake('');
    setSearchInput('');
    setSearchRes([]);
  };

  const setItemAsDefault = async (id) => {
    //fetching model name,abrv and makeId from store by paramId to set it as default
    let defaultData = toJS(observable.getModelById(id));
    if (!defaultData) {
      defaultData = await findById(id, schemaName);
      console.log(defaultData);
    }
    setName(defaultData.name);
    setAbrv(defaultData.abrv);

    //get make name from makeId to set it as default
    let makeRes = await findById(defaultData.makeId, 'vehicleMake');
    if (typeof makeRes === 'object') {
      setSearchRes([makeRes]);
      setMake(makeRes.id);
    } else {
      setError('Make not found');
    }
  };

  //add model, or update if it already has id
  const onSubmit = (e) => {
    e.preventDefault();

    if (paramId) {
      updateItem(
        { id: paramId, name: name, abrv: abrv, makeId: make },
        schemaName
      );
      setTimeout(() => navigate('/home'), 200);
    } else {
      addItem({ id: null, name: name, abrv: abrv, makeId: make }, schemaName);
      clearForm();
    }
  };

  //search all makes by name
  const searchHandler = async (input) => {
    setSearchInput(input);
    if (input.length) {
      let res = await searchByNameAndAbrv(input, 'vehicleMake');
      setSearchRes(res);
      setMake(res[0].id);
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
      <FormInput
        inputValue={searchInput}
        inputName={'Make'}
        onSetInput={searchHandler}
      />
      <FormSearchResults
        searchRes={searchRes}
        make={make}
        onSetMake={setMake}
      />
      <ErrorMsg msg={error} />
    </FormLayout>
  );
});
