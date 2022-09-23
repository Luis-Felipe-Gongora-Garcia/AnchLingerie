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
import { useFilterContext } from '../../shared/contexts';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { db } from '../../shared/services/api/firebase/Firebase';
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';

export const Sets: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = UseDebounce(1000);
  const [searchParams, setSearchParams] = useSearchParams();
  const { filterSize } = useFilterContext();

  const [isLoading, setIsLoading] = useState(true);

  const filterName = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const [allDocsSets, setAllDocsSets] = useState<DocumentData[]>([]);
  const [filterDocs, setFilterDocs] = useState<DocumentData[]>([]);

  function removeItem(arr: DocumentData[], prop: string, value: string) {
    return arr.filter((i) => {
      if (i[prop] === 'P, M, G e GG') {
        return i[prop];
      } else if (i[prop] === 'P, G e GG') {
        return i[prop];
      } else if (i[prop] === 'M, G e GG') {
        return i[prop];
      } else if (i[prop] === 'G e GG') {
        return i[prop];
      } else {
        return i[prop].slice(-2) !== value;
      }
    });
  }

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
        if (filterName.length !== 0) {
          const filter = filterDocs.filter((doc) => {
            return doc.nome.includes(filterName);
          });
          if (filterSize !== 'Filtro') {
            if (filterSize === 'Tamanho Plus Size') {
              const arr = filter.filter((doc) => {
                return doc.tamanhos.includes(filterSize?.slice(-9));
              });
              setAllDocsSets(arr);
              setIsLoading(false);
            } else {
              if (filterSize === 'Tamanho G') {
                const arr = filter.filter((doc) => {
                  return doc.tamanhos.includes(filterSize?.slice(-1));
                });
                const arr2 = removeItem(arr, 'tamanhos', 'GG');
                setAllDocsSets(arr2);
                setIsLoading(false);
                console.log('aqui', arr2);
              } else if (filterSize === 'Tamanho GG') {
                const arr = filter.filter((doc) => {
                  return doc.tamanhos.includes(filterSize?.slice(-1));
                });
                const arr2 = removeItem(arr, 'tamanhos', 'G');
                setAllDocsSets(arr2);
                setIsLoading(false);
                console.log('aqui', arr2);
              } else {
                const filterSizeDocs = filter.filter((doc) => {
                  return doc.tamanhos.includes(filterSize?.slice(-1));
                });
                setAllDocsSets(filterSizeDocs);
                setIsLoading(false);
              }
            }
          } else {
            setAllDocsSets(filter);
            setIsLoading(false);
          }
        } else if (filterSize !== 'Filtro') {
          if (filterSize === 'Tamanho Plus Size') {
            const arr = filterDocs.filter((doc) => {
              return doc.tamanhos.includes(filterSize?.slice(-9));
            });
            setAllDocsSets(arr);
            setIsLoading(false);
          } else {
            if (filterSize === 'Tamanho G') {
              const arr = filterDocs.filter((doc) => {
                return doc.tamanhos.includes(filterSize?.slice(-1));
              });
              const arr2 = removeItem(arr, 'tamanhos', 'GG');
              setAllDocsSets(arr2);
              setIsLoading(false);
            } else if (filterSize === 'Tamanho GG') {
              const arr = filterDocs.filter((doc) => {
                return doc.tamanhos.includes(filterSize?.slice(-1));
              });
              const arr2 = removeItem(arr, 'tamanhos', 'G');
              setAllDocsSets(arr2);
              setIsLoading(false);
            } else {
              const filterSizeDocs = filterDocs.filter((doc) => {
                return doc.tamanhos.includes(filterSize?.slice(-1));
              });
              setAllDocsSets(filterSizeDocs);
              setIsLoading(false);
            }
          }
        } else {
          setAllDocsSets(allSets);
          setIsLoading(false);
        }
      });
    };
    allCollection();
  }, [filterName, filterSize]);

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
          showFilter
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
        {allDocsSets.length === 0 && !isLoading && (
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
