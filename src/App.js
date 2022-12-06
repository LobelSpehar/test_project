import { useEffect } from 'react';
import { APIUtils } from './common/utilities/APIUtils';
import { ObserverTable } from './components/ObserverTable';
import { vehicleMakeStore } from './stores/makeStore';

function App() {
  const { fetchMakeList, addMake } = APIUtils();
  useEffect(() => {
    fetchMakeList();
  }, []);

  return (
    <div>
      <button
        onClick={(e) => addMake({ id: '', name: 'TestAdd', abrv: 'TestAdd' })}
      >
        Add new{' '}
      </button>
      <ObserverTable observable={vehicleMakeStore}></ObserverTable>
    </div>
  );
}

export default App;
