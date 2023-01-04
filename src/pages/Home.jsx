import { ObserverTable } from 'components';

export const Home = () => {
  const options = ['vehicleOwner', 'vehicleModel', 'vehicleMake'];
  return (
    <div id='home'>
      <ObserverTable options={options} />
    </div>
  );
};
