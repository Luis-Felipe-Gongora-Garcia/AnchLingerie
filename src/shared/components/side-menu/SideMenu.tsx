import { deepOrange } from '@mui/material/colors';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import IconBabyDoll from '../../../assets/images/babydoll.png';

interface ISideMenuProps {
  children?: React.ReactNode;
}

interface IListItemLinkProps {
  to: string;
  icon?: string;
  html?: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  html,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);

  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleCLick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleCLick}>
      <ListItemIcon>
        {icon ? <Icon>{icon}</Icon> : <img src={html} />}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideMenu: React.FC<ISideMenuProps> = ({ children }) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          height='100%'
          width={theme.spacing(28)}
          display='flex'
          flexDirection='column'
        >
          <Box
            width='100%'
            height={theme.spacing(20)}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Avatar
              sx={{
                height: theme.spacing(12),
                width: theme.spacing(12),
                bgcolor: deepOrange[100],
              }}
            >
              AL
            </Avatar>
          </Box>
          <Divider />
          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map((drawerOptions) => (
                <ListItemLink
                  to={drawerOptions.path}
                  icon={drawerOptions.icon}
                  key={drawerOptions.path}
                  label={drawerOptions.label}
                  html={drawerOptions.html}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
