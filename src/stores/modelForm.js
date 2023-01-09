import { APIUtils } from 'common/utilities';
import MobxReactForm from 'mobx-react-form';

import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';

const plugins = {
  dvr: dvr(validatorjs),
};

const { addItem, updateItem } = APIUtils();
const fields = [
  {
    name: 'abrv',
    label: 'abrv',
    placeholder: 'Insert abrv',
    rules: 'required|string',
    value: 'test',
  },
  {
    name: 'name',
    label: 'name',
    placeholder: 'Insert name',
    rules: 'required|string',
  },

  {
    name: 'makeId',
    label: 'make',
    placeholder: 'Insert make',
    rules: 'required|string',
  },
  { name: 'id', label: 'id', placeholder: '', rules: 'string' },
];

const hooks = {
  onSuccess(form) {
    if (form.$('id').value) {
      updateItem(form.values(), 'vehicleModel').then(() => form.clear());
    } else {
      addItem(form.values(), 'vehicleModel').then(() => form.clear());
    }
  },
  onError(form) {},
};

export const modelForm = new MobxReactForm({ fields }, { plugins, hooks });
