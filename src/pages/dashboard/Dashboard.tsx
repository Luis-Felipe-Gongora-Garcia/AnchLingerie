import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage
      toolbar={<Toolbar showSearchText showFilter />}
      title='Página Inicial'
    >
      Testando
    </LayoutBasePage>
  );
};
