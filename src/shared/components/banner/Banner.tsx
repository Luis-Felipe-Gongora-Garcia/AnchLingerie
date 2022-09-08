import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

interface IBannerProps {
  children: React.ReactNode;
}

export const Banner: React.FC<IBannerProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height={theme.spacing(20)}
        component={Paper}
        marginRight={1}
      >
        Teste
      </Box>
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </>
  );
};
