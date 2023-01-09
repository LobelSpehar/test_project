import { ObserverTable } from 'components';

export const Home = () => {
  const options = ['vehicle', 'vehicleModel', 'vehicleMake'];
  return (
    <div id='home'>
      <ObserverTable options={options} />
    </div>
  );
};
