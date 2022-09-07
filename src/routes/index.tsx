import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
      {
        icon: 'location_on',
        label: 'Localização',
        path: '/localizacao',
      },
      {
        icon: 'gpp_good',
        label: 'Politicas',
        path: '/politicas',
      },
      {
        icon: 'gpp_good',
        label: 'BabyDoll',
        path: '/babydoll',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
      <Route
        path='/localizacao'
        element={<Button variant='contained'>Ola</Button>}
      />
      <Route
        path='/politicas'
        element={<Button variant='contained'>politicas</Button>}
      />
      <Route
        path='/babydoll'
        element={<Button variant='contained'>babydoll</Button>}
      />
    </Routes>
  );
};
