import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { vehicleForm, resultsStore, dbStore } from 'stores';
import { APIUtils } from 'common/utilities';
import { FormLayout } from 'layouts';

export const VehicleForm = observer(
  ({ form = vehicleForm, result = resultsStore, observable = dbStore }) => {
    const { findById } = APIUtils();

    const paramId = useParams().id;

    const schemaName = 'vehicle';
    const foreignKey = 'vehicleModel';

    //get name and abrv from paramId to set as default
    const setItemAsDefault = async (id) => {
      let defaultData = toJS(observable.getItemById(id));
      if (!defaultData) {
        defaultData = await findById(id, schemaName);
      }
      form.$('price').set(defaultData.price);
      form.$('year').set(defaultData.year);
      form.$('odometer').set(defaultData.odometer);
      form.$('id').set(paramId);
      form.$('modelId').set(defaultData.modelId);
      result.getItemById(defaultData.modelId, foreignKey);
    };
    //checking if paramId exists and making sure it makes 1 api call by checking if we already have a result
    useEffect(() => {
      if (paramId && !result.searchResults.length) {
        setItemAsDefault(paramId);
      }
      return result.clear();
    }, []);
    const submitHandler = (e) => {
      form.onSubmit(e);
      result.clear();
    };
    return (
      <FormLayout submitHandler={submitHandler}>
        <label htmlFor={form.$('price').id}>{form.$('price').label}</label>
        <br />
        <input {...form.$('price').bind()} />
        <p>{form.$('price').error}</p>

        <label htmlFor={form.$('year').id}>{form.$('year').label}</label>
        <br />
        <input {...form.$('year').bind()} />
        <p>{form.$('year').error}</p>

        <label htmlFor={form.$('odometer').id}>
          {form.$('odometer').label}
        </label>
        <br />
        <input {...form.$('odometer').bind()} />
        <p>{form.$('odometer').error}</p>

        <label htmlFor='search'>Search</label>
        <br />
        <input
          id='search'
          value={result.input}
          onChange={(e) => result.setInput(e.target.value, foreignKey)}
        />
        <p>{result.error}</p>

        <label htmlFor={form.$('modelId').id}>{form.$('modelId').label}</label>

        <br />
        <select
          size='5'
          onChange={(e) => form.$('modelId').set(e.target.value)}
        >
          {result.searchResults.map((res) => (
            <option key={res.id} value={res.id}>
              {res.abrv}
            </option>
          ))}
        </select>
        <p>{form.$('modelId').error}</p>

        <p>{form.error}</p>
      </FormLayout>
    );
  }
);
