import { action, observable } from 'mobx';

class VehicleModelStore {
  data = observable.object({ total: 0, list: [] });

  setData = action((total, array) => {
    this.data.total = total;
    this.data.list = array;
  });
}

export const vehicleModelStore = new VehicleModelStore();
