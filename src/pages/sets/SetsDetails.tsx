import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToolDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import {
  ConjuntosService,
  IDetailSets,
} from '../../shared/services/api/conjuntos/ConjuntosService';
import { Box, Grid, Paper, Typography } from '@mui/material';
import SophiaB from '../../assets/images/conjuntoSophiaBranco.jpg';

export const SetsDetails: React.FC = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [descricao, setDescricao] = useState('');
  const [name, setName] = useState('');
  const [tamanhos, setTamanhos] = useState('');

  useEffect(() => {
    setIsLoading(true);
    ConjuntosService.getById(Number(id)).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
        navigate('/pessoas');
        return;
      }
      console.log(result);
      setName(result.nome);
      setDescricao(result.descricao);
      setTamanhos(result.tamanhos);
    });
  }, [id]);

  return (
    <LayoutBasePage
      title={name}
      toolbar={<ToolDetail onClickBack={() => navigate('/conjuntos')} />}
    >
      <Box
        display='flex'
        width='auto'
        height='auto'
        flex={1}
        justifyContent='center'
        alignItems='center'
        margin={1}
        component={Paper}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Box m={3} component='div'>
              <img height='700' src={SophiaB} />
            </Box>
          </Grid>
          <Grid
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
            item
            xs={4}
          >
            <Box
              m={3}
              component='div'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              flex={1}
            >
              <Typography gutterBottom variant='h2'>
                {name}
              </Typography>
              <Typography gutterBottom variant='body1'>
                {descricao}
              </Typography>
              <Typography gutterBottom variant='body2'>
                Tamanhos disponiveis: {tamanhos}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
