import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path='/pagina-inicial'
        element={
          <Button
            variant='contained'
            color='primary'
            onClick={toggleDrawerOpen}
          >
            ToggleDrawer
          </Button>
        }
      />
      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
      <Route
        path='/localizacao'
        element={<Button variant='contained'>Ola</Button>}
      />
    </Routes>
  );
};
