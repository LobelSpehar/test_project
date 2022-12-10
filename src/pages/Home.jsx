import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Table } from 'pages';
import { dbStore } from 'stores';

export const Home = observer(({ observable = dbStore }) => {
  return (
    <div id='home'>
      <Table
        list={toJS(observable.modelList)}
        total={toJS(observable.modelTotal)}
        schemaName={'vehicleModel'}
        refresh={observable.refresh}
      />
      <Table
        list={toJS(observable.makeList)}
        total={toJS(observable.makeTotal)}
        schemaName={'vehicleMake'}
        refresh={observable.refresh}
      />
    </div>
  );
});
