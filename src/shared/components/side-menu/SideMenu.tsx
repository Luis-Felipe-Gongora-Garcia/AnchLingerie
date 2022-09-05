import { Drawer } from '@mui/material';

interface ISideMenuProps {
  children?: React.ReactNode;
}

export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
  return <Drawer variant='permanent'>Teste</Drawer>;
};
