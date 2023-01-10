import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home, MakeForm, ModelForm, VehicleForm } from 'pages';
import { Layout } from 'layouts';

function App() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, [pathname]);

  return (
    <Layout>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/add/vehicleModel/' element={<ModelForm />} />
        <Route path='/edit/vehicleModel/:id' element={<ModelForm />} />
        <Route path='/add/vehicleMake/' element={<MakeForm />} />
        <Route path='/edit/vehicleMake/:id' element={<MakeForm />} />
        <Route path='/add/vehicle/' element={<VehicleForm />} />
        <Route path='/edit/vehicle/:id' element={<VehicleForm />} />
        <Route path='*' element={<div>Error page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
