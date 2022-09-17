import { useMemo, useEffect, useState } from 'react';
import { ToolList } from '../../shared/components';
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
import { LayoutBasePage } from '../../shared/layouts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';
import {
  ConjuntosService,
  IListSets,
} from '../../shared/services/api/conjuntos/ConjuntosService';
import { UseDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';
import SophiaB from '../../assets/images/conjuntoSophiaBranco.jpg';
import SophiaP from '../../assets/images/conjuntoSophiaPreto.jpg';
import ClaraV from '../../assets/images/conjuntoClaraVerdeA.jpg';
import ClaraB from '../../assets/images/conjuntoClaraBranca.jpg';

export const Sets: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(1000);

  const [cards, setCards] = useState<IListSets[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const filterName = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const imgs = [SophiaB, SophiaP, ClaraV, ClaraB];

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      ConjuntosService.getAll(page, filterName).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
        setCards(result.data);
        setTotalCount(result.totalCount);
      });
    });
  }, [filterName, page, debounce]);

  return (
    <LayoutBasePage
      title='Camisolas'
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
          {totalCount === 0 && !isLoading && (
            <caption>
              <Typography variant='h4'>{Environment.LISTAGEM_VAZIA}</Typography>
            </caption>
          )}
          {isLoading ? (
            <Box overflow='hidden'>
              <CircularProgress variant='indeterminate' size={200} />
            </Box>
          ) : (
            cards.map((card) => (
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
                      image={imgs[card.id]}
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
        {totalCount > 0 &&
          totalCount > Environment.LIMITE_DE_LINHAS &&
          !isLoading && (
            <Pagination
              page={page}
              count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
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
