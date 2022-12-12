import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { Home, MakeForm, ModelForm } from 'pages';
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
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/add/vehicleModel/' element={<ModelForm />} />
        <Route path='/edit/vehicleModel/:id' element={<ModelForm />} />
        <Route path='/add/vehicleMake/' element={<MakeForm />} />
        <Route path='/edit/vehicleMake/:id' element={<MakeForm />} />
        <Route path='*' element={<div>Error page not found</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
