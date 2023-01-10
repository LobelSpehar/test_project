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
  },
  {
    name: 'name',
    label: 'name',
    placeholder: 'Insert name',
    rules: 'required|string',
  },
  { name: 'id', label: 'id', placeholder: '', rules: 'string' },
];

const hooks = {
  onSuccess(form) {
    if (form.$('id').value) {
      updateItem(form.values(), 'vehicleMake').then(() => form.clear());
    } else {
      addItem(form.values(), 'vehicleMake').then(() => form.clear());
    }
  },
  onError(form) {},
};

export const makeForm = new MobxReactForm({ fields }, { plugins, hooks });
