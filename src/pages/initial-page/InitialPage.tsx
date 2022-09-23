import { ArrowForwardIos } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToolList } from '../../shared/components';
import { Environment } from '../../shared/environment';
import { LayoutBasePage } from '../../shared/layouts';
import { db } from '../../shared/services/api/firebase/Firebase';

export const InitialPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [someDocsSets, setSomeDocsSets] = useState<DocumentData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const setsCollection = async () => {
      const someDocs = query(collection(db, 'Conjuntos'), limit(3));
      const documentSnapshots = await getDocs(someDocs);
      const someSets = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSomeDocsSets(someSets);
      setIsLoading(false);
    };
    setsCollection();
  }, []);

  return (
    <LayoutBasePage title='AnchLingerie'>
      <Box
        display='flex'
        width='auto'
        height='auto'
        flexDirection='column'
        flex={1}
        justifyContent='center'
        alignItems='center'
        margin={1}
        component={Paper}
      >
        {someDocsSets.length === 0 && !isLoading && (
          <Typography variant='h4'>{Environment.LISTAGEM_VAZIA}</Typography>
        )}
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          overflow='auto'
          width='100%'
          height='100%'
        >
          {/* <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            height={120}
            flex={1}
          >
            <Box display='flex' height={40}>
              <Button
                color='secondary'
                variant='outlined'
                endIcon={<ArrowForwardIos fontSize='large' />}
              >
                <Typography variant={'h3'}>Conjuntos</Typography>
              </Button>
            </Box>
          </Box> */}
          {isLoading ? (
            <Box overflow='hidden'>
              <CircularProgress variant='indeterminate' size={200} />
            </Box>
          ) : (
            someDocsSets.map((set) => (
              <Card
                key={set.id}
                sx={{
                  maxWidth: 400,
                  maxHeight: 650,
                  width: '100%',
                  height: '100%',
                  marginX: 4,
                  margin: 1,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/conjuntos/detalhe/${set.id}`)}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box>
                    <CardMedia
                      component='img'
                      width='auto'
                      height='250'
                      image={set.img}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography gutterBottom variant='h5' component='div'>
                      {set.nome}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body2'
                      color='text.secondary'
                    >
                      {set.descricaoAbrev}
                    </Typography>
                    <Typography variant='h6'>{set.preco}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {set.tamanhos}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </LayoutBasePage>
  );
};
