import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Icon,
  useMediaQuery,
} from '@mui/material';
import { useDrawerContext } from '../contexts';

interface ILayoutBasePageProps {
  children?: React.ReactNode;
  title: string;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  title,
  children,
}) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box
        padding={1}
        height={theme.spacing(12)}
        display='flex'
        alignItems='center'
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography variant='h5'>{title}</Typography>
      </Box>
      <Box>Barra de ferramentas</Box>
      <Box>{children}</Box>
    </Box>
  );
};
