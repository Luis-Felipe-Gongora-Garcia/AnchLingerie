import { WhatsApp } from '@mui/icons-material';
import { Box, Button, Paper, useTheme, Icon } from '@mui/material';

interface IToolDetail {
  onClickBack?: () => void;
}

export const ToolDetail: React.FC<IToolDetail> = ({ onClickBack }) => {
  const theme = useTheme();

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
      <Box display='flex' justifyContent='start'>
        <Button endIcon={<WhatsApp />} variant='contained'>
          Pedir no WhatsApp
        </Button>
      </Box>
      <Box display='flex' flex={1} justifyContent='end'>
        <Button
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBack}
          variant='contained'
        >
          Voltar
        </Button>
      </Box>
    </Box>
  );
};
