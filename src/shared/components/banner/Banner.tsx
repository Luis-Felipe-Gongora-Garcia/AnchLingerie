import { Paper, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';

interface IBannerProps {
  children?: React.ReactNode;
}

export const Banner: React.FC<IBannerProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      width='100%'
      height={theme.spacing(20)}
      display='flex'
      justifyContent='center'
      alignItems='center'
      component={Paper}
    >
      <Typography variant='h1'>Banner</Typography>
    </Box>
  );
};
