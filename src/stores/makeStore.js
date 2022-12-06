import { action, observable } from 'mobx';

class VehicleMakeStore {
  vehicleMakes = observable.array([]);

  createMake = action((array) => {
    this.vehicleMakes.replace(array);
  });
  getVehicleMakes = action(() => {
    return this.vehicleMakes;
  });
}

export const vehicleMakeStore = new VehicleMakeStore();
