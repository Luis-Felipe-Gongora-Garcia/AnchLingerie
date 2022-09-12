import { useMemo, useEffect, useState } from 'react';
import { ToolList } from '../../shared/components';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Paper,
} from '@mui/material';
import { LayoutBasePage } from '../../shared/layouts';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';
import {
  ConjuntosService,
  IListSets,
} from '../../shared/services/api/conjuntos/ConjuntosService';
import { UseDebounce } from '../../shared/hooks';

export const Sets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = UseDebounce(1000);

  const [cards, setCards] = useState<IListSets[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      ConjuntosService.getAll(1, search).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result);
        setCards(result.data);
      });
    });
  }, [search]);

  return (
    <LayoutBasePage
      title='Camisolas'
      toolbar={
        <ToolList
          showFilter
          showSearchText
          searchText={search}
          changeTextSearch={(texto) =>
            setSearchParams({ busca: texto }, { replace: true })
          }
        />
      }
    >
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        margin={1}
        // marginX={4}
        gap={2}
        component={Paper}
      >
        {cards.map((card) => (
          <Card
            key={card.nome}
            sx={{
              maxWidth: 400,
              maxHeight: 400,
              width: 400,
              height: 400,
              marginX: 4,
            }}
          >
            <CardActionArea
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component='img'
                height='250'
                image={require('../../assets/images/conjuntotal.png')}
              />
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
                <Typography gutterBottom variant='body2' color='text.secondary'>
                  {card.descricaoAbrev}
                </Typography>
                <Typography variant='h6'>{card.preco}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </LayoutBasePage>
  );
};
