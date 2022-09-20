import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToolDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../shared/services/api/firebase/Firebase';

export const SetsDetails: React.FC = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [descricao, setDescricao] = useState('');
  const [name, setName] = useState('');
  const [tamanhos, setTamanhos] = useState('');
  const [docsSets, setDocsSets] = useState<DocumentData>();

  useEffect(() => {
    setIsLoading(true);
    const paginate = async () => {
      const docRef = doc(db, 'Conjuntos', id);
      const docSnap = await getDoc(docRef);
      const sets = docSnap.data();
      setDocsSets(sets);
      setIsLoading(false);
    };
    paginate();
  }, []);

  return (
    <LayoutBasePage
      title={docsSets?.nome}
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
          <Grid item xs={6}>
            <Box m={3} component='div'>
              <img height='100%' src={docsSets?.img} />
            </Box>
          </Grid>
          <Grid
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
            item
            xs={6}
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
              {isLoading ? (
                <Box overflow='hidden'>
                  <CircularProgress variant='indeterminate' size={200} />
                </Box>
              ) : (
                <Box
                  component='div'
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Typography gutterBottom variant='h2'>
                    {docsSets?.nome}
                  </Typography>
                  <Typography gutterBottom variant='body1'>
                    {docsSets?.descricao}
                  </Typography>
                  <Typography gutterBottom variant='body2'>
                    Valor: {docsSets?.preco}
                  </Typography>
                  <Typography gutterBottom variant='body1'>
                    Tamanhos disponiveis: {docsSets?.tamanhos}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
