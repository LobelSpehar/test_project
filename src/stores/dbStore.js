import { action, makeAutoObservable, observable, runInAction } from 'mobx';

import { APIUtils } from 'common/utilities';

class DbStore {
  //stored data
  makeTotal = observable(0);
  makeList = observable.array([]);
  modelTotal = observable(0);
  modelList = observable.array([]);

  constructor() {
    makeAutoObservable(this);
  }

  //store fetched data
  saveData = action((total, list, schemaName) => {
    if (schemaName === 'vehicleModel') {
      this.modelTotal = total;
      this.modelList = list;
    } else {
      this.makeTotal = total;
      this.makeList = list;
    }
  });

  //fetch data
  refresh = async (page, rpp, sortBy, schemaName) => {
    const { fetchItems } = APIUtils();
    let result = await fetchItems(page, rpp, sortBy, schemaName);
    runInAction(() => {
      this.saveData(result.total, result.list, schemaName);
    });
  };

  //fetch by id local
  getModelById = (id) => this.modelList.filter((item) => item.id === id)[0];
  getMakeById = (id) => this.makeList.filter((item) => item.id === id)[0];
}

export const dbStore = new DbStore();
