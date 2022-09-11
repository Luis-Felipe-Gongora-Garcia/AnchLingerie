import {
  Box,
  Icon,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ReactNode } from 'react';

import { useDrawerContext } from '../contexts';

interface ILayoutBasePageProps {
  title: string;
  toolbar?: ReactNode;
  children?: React.ReactNode;
}

export const LayoutBasePage: React.FC<ILayoutBasePageProps> = ({
  title,
  toolbar,
  children,
}) => {
  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height='100%' display='flex' flexDirection='column' gap={1}>
      <Box
        gap={1}
        padding={1}
        display='flex'
        alignItems='center'
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {title}
        </Typography>
      </Box>
      {toolbar && <Box>{toolbar}</Box>}
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};
