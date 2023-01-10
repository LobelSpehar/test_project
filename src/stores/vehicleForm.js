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
    name: 'price',
    label: 'price',
    placeholder: 'Insert price',
    rules: 'required|integer',
  },
  {
    name: 'year',
    label: 'year',
    placeholder: 'Insert year',
    rules: 'required|integer',
  },
  {
    name: 'odometer',
    label: 'odometer',
    placeholder: 'Insert odometer',
    rules: 'required|integer',
  },
  {
    name: 'modelId',
    label: 'model',
    placeholder: 'Insert model',
    rules: 'required|string',
  },
  { name: 'id', label: 'id', placeholder: '', rules: 'string' },
];

const hooks = {
  onSuccess(form) {
    if (form.$('id').value) {
      updateItem(form.values(), 'vehicle').then(() => form.clear());
    } else {
      addItem(form.values(), 'vehicle').then(() => form.clear());
    }
  },
  onError(form) {},
};

export const vehicleForm = new MobxReactForm({ fields }, { plugins, hooks });
