import { action, makeObservable, observable } from 'mobx';

import { APIUtils } from 'common/utilities';

class ResultsStore {
  //stored data
  input = '';
  searchResults = [];
  error = '';
  constructor() {
    makeObservable(this, {
      input: observable,
      searchResults: observable,
      error: observable,
    });
  }

  //setState
  setInput = action((val, schemaName) => {
    this.input = val;
    if (val) {
      this.search(val, schemaName);
    }
  });
  setSearchResults = action((val) => (this.searchResults = val));
  setError = action((val) => (this.error = val));

  //clear all fields
  clear = () => {
    this.setInput('');
    this.setSearchResults([]);
    this.setError('');
  };

  //fetch data
  search = async (input, schemaName) => {
    const { searchByNameAndAbrv } = APIUtils();
    const result = await searchByNameAndAbrv(input, schemaName);

    this.setSearchResults(result);
  };

  //fetch result by id
  getItemById = async (id, schemaName) => {
    const { findById } = APIUtils();
    const result = await findById(id, schemaName);
    if (typeof result === 'string') {
      this.setError('Resource not found for ' + schemaName + ' ID.');
    } else {
      this.setSearchResults([result]);
    }
  };
}

export const resultsStore = new ResultsStore();
