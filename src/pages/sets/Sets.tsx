import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import { UseDebounce } from '../../shared/hooks';
import { ToolList } from '../../shared/components';
import { useMemo, useEffect, useState } from 'react';
import { LayoutBasePage } from '../../shared/layouts';
import { Environment } from '../../shared/environment';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { db } from '../../shared/services/api/firebase/Firebase';
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { DockSharp } from '@mui/icons-material';

export const Sets: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = UseDebounce(1000);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const filterName = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  interface IAllSets {
    id: string;
    [x: string]: any;
  }

  const [allDocsSets, setAllDocsSets] = useState<DocumentData[]>([]);
  const [filterDocs, setFilterDocs] = useState<DocumentData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const allCollection = async () => {
      const allDocs = query(collection(db, 'Conjuntos'));
      const documentSnapshots = await getDocs(allDocs);
      const allSets = documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFilterDocs(allSets);
      debounce(() => {
        if (filterName.length != 0) {
          const filter = filterDocs.filter((doc) => {
            return doc.nome.includes(filterName);
          });
          console.log(filter);
          setAllDocsSets(filter);
          setIsLoading(false);
        } else {
          setAllDocsSets(allSets);
          setIsLoading(false);
        }
      });
    };
    allCollection();
  }, [filterName]);

  return (
    <LayoutBasePage
      title='Conjuntos'
      toolbar={
        <ToolList
          showSearchText
          searchText={filterName}
          changeTextSearch={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
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
          width='100%'
          height='100%'
        >
          {allDocsSets.length === 0 && !isLoading && (
            <caption>
              <Typography variant='h4'>{Environment.LISTAGEM_VAZIA}</Typography>
            </caption>
          )}
          {isLoading ? (
            <Box overflow='hidden'>
              <CircularProgress variant='indeterminate' size={200} />
            </Box>
          ) : (
            allDocsSets.map((card) => (
              <Card
                key={card.id}
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
      </Box>
    </LayoutBasePage>
  );
};
