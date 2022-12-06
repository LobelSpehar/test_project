import { toJS } from 'mobx';

import { observer } from 'mobx-react';

export const ObserverTable = observer(({ observable }) => {
  return (
    <div>
      <button onClick={(e) => console.log(toJS(observable.getVehicleMakes()))}>
        add test
      </button>
      {toJS(observable.getVehicleMakes()).map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
