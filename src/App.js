import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { Table, Form } from 'pages';
import { Layout } from 'layouts';
import { vehicleMakeStore, vehicleModelStore } from 'stores';

function App() {
  const navLinks = [
    { path: '/models', title: 'Models' },
    { path: '/makes', title: 'Makes' },
    { path: '/add/vehicleMake/', title: 'Add make' },
    { path: '/add/vehicleModel/', title: 'Add model' },
  ];
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/models');
    }
  }, [pathname]);

  return (
    <Layout navLinks={navLinks}>
      <Routes>
        <Route
          path='/makes'
          element={
            <Table observable={vehicleMakeStore} schemaName={'vehicleMake'} />
          }
        />
        <Route
          path='/models'
          element={
            <Table observable={vehicleModelStore} schemaName={'vehicleModel'} />
          }
        />
        <Route
          path='/add/vehicleModel/'
          element={
            <Form observable={vehicleModelStore} schemaName={'vehicleModel'} />
          }
        />
        <Route
          path='/edit/vehicleModel/:id'
          element={
            <Form observable={vehicleModelStore} schemaName={'vehicleModel'} />
          }
        />
        <Route
          path='/add/vehicleMake/'
          element={
            <Form observable={vehicleMakeStore} schemaName={'vehicleMake'} />
          }
        />
        <Route
          path='/edit/vehicleMake/:id'
          element={
            <Form observable={vehicleMakeStore} schemaName={'vehicleMake'} />
          }
        />
        <Route path='*' element={<div>Error pathname has no match</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
