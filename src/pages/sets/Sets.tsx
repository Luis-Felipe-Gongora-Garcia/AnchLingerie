import { useMemo, useEffect } from 'react';
import { ToolList } from '../../shared/components';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { LayoutBasePage } from '../../shared/layouts';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { ConjuntosService } from '../../shared/services/api/conjuntos/ConjuntosService';

export const Sets: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    ConjuntosService.getAll(1, search).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
      console.log(result);
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
        flex={1}
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        margin={1}
        marginX={4}
        gap={2}
      >
        <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='200'
              image={require('../../assets/images/conjuntotal.png')}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Conjunto Tal
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Este lindo conjunto tal tal tal tal tal tal tal tal tal ta ta ta
                ta ta ta tata
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </LayoutBasePage>
  );
};
