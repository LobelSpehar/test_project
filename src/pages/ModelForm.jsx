import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { dbStore } from 'stores';
import { APIUtils } from 'common/utilities';
import { ErrorMsg, FormInput } from 'components';
import { FormLayout } from 'layouts';

export const ModelForm = observer(({ observable = dbStore }) => {
  const { addItem, updateItem, searchMakes, getMakeById } = APIUtils();
  const [name, setName] = useState('');
  const [abrv, setAbrv] = useState('');
  const [make, setMake] = useState('test');
  const [searchInput, setSearchInput] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [error, setError] = useState('');
  const schemaName = 'vehicleModel';

  const paramId = useParams().id;
  const navigate = useNavigate();

  const setItemAsDefault = async (id) => {
    //get name, abrv and makeId from paramId to set as default
    let modelsList = toJS(observable.modelList);
    let defaultData = modelsList.find((item) => item.id === id);
    setName(defaultData.name);
    setAbrv(defaultData.abrv);

    // ne radi mathchanje makeId-a s bazom *******************************************************************
    console.log(await getMakeById(defaultData.makeId));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (paramId) {
      updateItem(
        { id: paramId, name: name, abrv: abrv, makeId: make },
        schemaName
      );
      setTimeout(() => navigate('/home'), 200);
    } else {
      addItem(
        { id: paramId, name: name, abrv: abrv, makeId: make },
        schemaName
      );
      setName('');
      setAbrv('');
      setMake('');
    }
  };
  //search makes by name
  const searchHandler = async (e) => {
    let input = e.target.value;
    setSearchInput(input);
    if (input.length) {
      await searchMakes(input).then((res) => setSearchRes(res));
    }
  };

  useEffect(() => {
    if (paramId) {
      setItemAsDefault(paramId);
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
      <label htmlFor='make'>Make</label>
      <br />
      <input id='make' value={searchInput} onChange={searchHandler}></input>
      <br />
      <select
        required
        size={5}
        value={make}
        onChange={(e) => setMake(e.target.value)}
      >
        {searchRes.map((res) => (
          <option key={res.id} value={res.id}>
            {res.abrv}
          </option>
        ))}
      </select>
      {/* <ul id='searchRes'>
        {searchRes.map((res) => (
          <li key={res.id}>
            <button
              type='button'
              className={make === res.id ? 'selected' : ''}
              onClick={(e) => {
                setMake(res.id);
                setSearchRes([res]);
              }}
            >
              {res.abrv}
            </button>
          </li>
        ))}
      </ul> */}
      <ErrorMsg msg={error} />
    </FormLayout>
  );
});
