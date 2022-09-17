import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToolDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import {
  ConjuntosService,
  IDetailSets,
} from '../../shared/services/api/conjuntos/ConjuntosService';

export const SetsDetails: React.FC = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [set, setSet] = useState<IDetailSets[]>([]);
  const [name, setName] = useState('');

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
    });
  }, [id]);

  return (
    <LayoutBasePage
      title={name}
      toolbar={<ToolDetail onClickBack={() => navigate('/conjuntos')} />}
    >
      <p>Detalhes {id}</p>
    </LayoutBasePage>
  );
};
