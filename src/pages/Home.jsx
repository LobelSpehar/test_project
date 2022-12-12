import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { ObserverTable } from 'components';
import { dbStore } from 'stores';

export const Home = observer(({ observable = dbStore }) => {
  return (
    <div id='home'>
      <ObserverTable
        list={toJS(observable.modelList)}
        total={toJS(observable.modelTotal)}
        schemaName={'vehicleModel'}
        refresh={observable.refresh}
      />
      <ObserverTable
        list={toJS(observable.makeList)}
        total={toJS(observable.makeTotal)}
        schemaName={'vehicleMake'}
        refresh={observable.refresh}
      />
    </div>
  );
});
