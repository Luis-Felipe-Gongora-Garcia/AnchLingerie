import {
  Box,
  Button,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';

export const Toolbar: React.FC = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      component={Paper}
      alignItems='center'
      flexDirection='row'
      height={theme.spacing(5)}
    >
      <TextField size='small' />
      <Box>
        <Button
          variant='contained'
          aria-haspopup='true'
          onClick={handleClick}
          aria-expanded={openMenu ? 'true' : undefined}
          aria-controls={openMenu ? 'basic-menu' : undefined}
        >
          <Typography>Filtro</Typography>
        </Button>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Tamanho P</MenuItem>
          <MenuItem onClick={handleClose}>Tamanho M</MenuItem>
          <MenuItem onClick={handleClose}>Tamanho G</MenuItem>
          <MenuItem onClick={handleClose}>Tamanho GG</MenuItem>
          <MenuItem onClick={handleClose}>Do maior R$ pro menor R$</MenuItem>
          <MenuItem onClick={handleClose}>Do menor R$ pro maior R$</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
