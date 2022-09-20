import { Box } from '@mui/system';
import { useMemo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import { db } from '../../shared/services/api/firebase/Firebase';
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore';

export const Sets: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const filterName = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const [docsSets, setDocsSets] = useState<DocumentData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const paginate = async () => {
      const firstPage = query(
        collection(db, 'Conjuntos'),
        limit(Environment.LIMITE_DE_LINHAS)
      );
      const documentSnapshots = await getDocs(firstPage);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const next = query(
        collection(db, 'conjuntos'),
        startAfter(lastVisible),
        limit(8)
      );
      const sets = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocsSets(sets);
      setIsLoading(false);
    };
    paginate();
  }, []);

  return (
    <LayoutBasePage
      title='Conjuntos'
      toolbar={
        <ToolList
          showSearchText
          searchText={filterName}
          changeTextSearch={(texto) =>
            setSearchParams({ busca: texto, pagina: '1' }, { replace: true })
          }
        />
      }
    >
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
        <Box
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          overflow='auto'
        >
          {docsSets.length === 0 && !isLoading && (
            <caption>
              <Typography variant='h4'>{Environment.LISTAGEM_VAZIA}</Typography>
            </caption>
          )}
          {isLoading ? (
            <Box overflow='hidden'>
              <CircularProgress variant='indeterminate' size={200} />
            </Box>
          ) : (
            docsSets.map((card) => (
              <Card
                key={card.id}
                sx={{
                  maxWidth: 400,
                  maxHeight: 650,
                  width: 'auto',
                  height: 'auto',
                  marginX: 4,
                  margin: 1,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/conjuntos/detalhe/${card.id}`)}
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
                      image={card.img}
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
                      {card.nome}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='body2'
                      color='text.secondary'
                    >
                      {card.descricaoAbrev}
                    </Typography>
                    <Typography variant='h6'>{card.preco}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {card.tamanhos}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </Box>
        {docsSets.length > 0 &&
          docsSets.length > Environment.LIMITE_DE_LINHAS &&
          !isLoading && (
            <Pagination
              page={page}
              count={Math.ceil(docsSets.length / Environment.LIMITE_DE_LINHAS)}
              onChange={(_, newPage) =>
                setSearchParams(
                  { busca: filterName, pagina: newPage.toString() },
                  { replace: true }
                )
              }
            />
          )}
      </Box>
    </LayoutBasePage>
  );
};
