import { action, observable } from 'mobx';

class VehicleMakeStore {
  data = observable.object({ total: 0, list: [] });

  setData = action((total, array) => {
    this.data.total = total;
    this.data.list = array;
  });
  getItemById = (id) => this.data.list.filter((item) => item.id === id);
}

export const vehicleMakeStore = new VehicleMakeStore();
