import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import MyBanner from '../../../assets/images/banner.png';

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
        <img width='100%' height='100%' src={MyBanner} alt='banner' />
      </Box>
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </>
  );
};
