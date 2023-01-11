import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { resultsStore, dbStore, modelForm } from 'stores';
import { APIUtils } from 'common/utilities';
import { FormLayout } from 'layouts';

export const ModelForm = observer(
  ({ form = modelForm, result = resultsStore, observable = dbStore }) => {
    const { findById } = APIUtils();

    const paramId = useParams().id;

    const schemaName = 'vehicleModel';
    const foreignKey = 'vehicleMake';

    //get name and abrv from paramId to set as default
    const setItemAsDefault = async (id) => {
      let defaultData = toJS(observable.getItemById(id));
      if (!defaultData) {
        defaultData = await findById(id, schemaName);
      }
      form.$('abrv').set(defaultData.abrv);
      form.$('name').set(defaultData.name);
      form.$('id').set(paramId);
      form.$('makeId').set(defaultData.makeId);
      result.getItemById(defaultData.makeId, foreignKey);
    };
    //checking if paramId exists and making sure it makes 1 api call by checking if we already have a result
    useEffect(() => {
      if (paramId && !result.searchResults.length) {
        setItemAsDefault(paramId);
      }
      return () => {
        result.clear();
        form.clear();
      };
    }, [paramId]);

    const submitHandler = (e) => {
      form.onSubmit(e);
      result.clear();
    };
    return (
      <FormLayout submitHandler={submitHandler}>
        <label htmlFor={form.$('abrv').id}>{form.$('abrv').label}</label>
        <br />
        <input {...form.$('abrv').bind()} />
        <p>{form.$('abrv').error}</p>

        <label htmlFor={form.$('name').id}>{form.$('name').label}</label>
        <br />
        <input {...form.$('name').bind()} />
        <p>{form.$('name').error}</p>

        <label htmlFor='search'>Search</label>
        <br />
        <input
          id='search'
          value={result.input}
          onChange={(e) => result.setInput(e.target.value, foreignKey)}
        />
        <p>{result.error}</p>

        <label htmlFor={form.$('makeId').id}>{form.$('makeId').label}</label>
        <br />
        <select size='5' onChange={(e) => form.$('makeId').set(e.target.value)}>
          {result.searchResults.map((res) => (
            <option key={res.id} value={res.id}>
              {res.abrv}
            </option>
          ))}
        </select>
        <p>{form.$('makeId').error}</p>

        <p>{form.error}</p>
      </FormLayout>
    );
  }
);
