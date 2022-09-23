import { ArrowForwardIos } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
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
import { Environment } from '../../shared/environment';
import { LayoutBasePage } from '../../shared/layouts';
import { db } from '../../shared/services/api/firebase/Firebase';

export const InitialPage = () => {
  const navigate = useNavigate();

  const [isLoadingSets, setIsLoadingSets] = useState(true);
  const [isLoadingSweaters, setIsLoadingSweaters] = useState(true);
  const [isLoadingBaby, setIsLoadingBaby] = useState(true);
  const [someDocsSets, setSomeDocsSets] = useState<DocumentData[]>([]);
  const [someDocsSweaters, setSomeDocsSweaters] = useState<DocumentData[]>([]);
  const [someDocsBabyDoll, setSomeBabyDoll] = useState<DocumentData[]>([]);

  useEffect(() => {
    setIsLoadingSets(true);
    const setsCollection = async () => {
      const someDocs = query(collection(db, 'Conjuntos'), limit(3));
      const documentSnapshots = await getDocs(someDocs);
      const someSets = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSomeDocsSets(someSets);
      setIsLoadingSets(false);
    };
    const sweatersCollection = async () => {
      const someDocs = query(collection(db, 'Camisolas'), limit(3));
      const documentSnapshots = await getDocs(someDocs);
      const someSweaters = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSomeDocsSweaters(someSweaters);
      setIsLoadingSweaters(false);
    };
    const babydollCollection = async () => {
      const someDocs = query(collection(db, 'BabyDoll'), limit(3));
      const documentSnapshots = await getDocs(someDocs);
      const someBaby = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSomeBabyDoll(someBaby);
      setIsLoadingBaby(false);
    };
    sweatersCollection();
    babydollCollection();
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
        <Grid container>
          <Grid item xs={12} width='100%' height='100%'>
            {someDocsSets.length === 0 && !isLoadingSets && (
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
              {isLoadingSets ? (
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
              {!isLoadingSets ? (
                <Box display='flex' alignItems='center'>
                  <Button onClick={() => navigate('/conjuntos')}>
                    <ArrowForwardIos sx={{ fontSize: 80, color: '#DDA0DD' }} />
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} width='100%' height='100%'>
            {someDocsBabyDoll.length === 0 && !isLoadingBaby && (
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
              {isLoadingBaby ? (
                <Box overflow='hidden'>
                  <CircularProgress variant='indeterminate' size={200} />
                </Box>
              ) : (
                someDocsBabyDoll.map((sweaters) => (
                  <Card
                    key={sweaters.id}
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
                      onClick={() =>
                        navigate(`/babydoll/detalhe/${sweaters.id}`)
                      }
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
                          image={sweaters.img}
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
                          {sweaters.nome}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='body2'
                          color='text.secondary'
                        >
                          {sweaters.descricaoAbrev}
                        </Typography>
                        <Typography variant='h6'>{sweaters.preco}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {sweaters.tamanhos}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              )}
              {!isLoadingBaby ? (
                <Box display='flex' alignItems='center'>
                  <Button onClick={() => navigate('/babydoll')}>
                    <ArrowForwardIos sx={{ fontSize: 80, color: '#DDA0DD' }} />
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} width='100%' height='100%'>
            {someDocsSweaters.length === 0 && !isLoadingSweaters && (
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
              {isLoadingSweaters ? (
                <Box overflow='hidden'>
                  <CircularProgress variant='indeterminate' size={200} />
                </Box>
              ) : (
                someDocsSweaters.map((sweaters) => (
                  <Card
                    key={sweaters.id}
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
                      onClick={() =>
                        navigate(`/camisolas/detalhe/${sweaters.id}`)
                      }
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
                          image={sweaters.img}
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
                          {sweaters.nome}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='body2'
                          color='text.secondary'
                        >
                          {sweaters.descricaoAbrev}
                        </Typography>
                        <Typography variant='h6'>{sweaters.preco}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {sweaters.tamanhos}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))
              )}
              {!isLoadingSweaters ? (
                <Box display='flex' alignItems='center'>
                  <Button onClick={() => navigate('/camisolas')}>
                    <ArrowForwardIos sx={{ fontSize: 80, color: '#DDA0DD' }} />
                  </Button>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
