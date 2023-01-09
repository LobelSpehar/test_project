import { useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import { resultsStore, dbStore, makeForm } from 'stores';
import { APIUtils } from 'common/utilities';
import { toJS } from 'mobx';
import { useEffect } from 'react';
import { FormLayout } from 'layouts';

export const MakeForm = observer(
  ({ form = makeForm, result = resultsStore, observable = dbStore }) => {
    const { findById } = APIUtils();

    const paramId = useParams().id;

    const schemaName = 'vehicleMake';

    //get name and abrv from paramId to set as default
    const setItemAsDefault = async (id) => {
      let defaultData = toJS(observable.getItemById(id));
      if (!defaultData) {
        defaultData = await findById(id, schemaName);
      }
      form.$('abrv').set(defaultData.abrv);
      form.$('name').set(defaultData.name);
      form.$('id').set(paramId);
    };

    useEffect(() => {
      if (paramId) {
        setItemAsDefault(paramId);
      } else {
        form.clear();
      }
      return result.clear();
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

        <p>{form.error}</p>
      </FormLayout>
    );
  }
);
