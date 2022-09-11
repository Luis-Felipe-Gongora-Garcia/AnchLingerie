import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage
      toolbar={<ToolList showSearchText showFilter />}
      title='Página Inicial'
    >
      Testando
    </LayoutBasePage>
  );
};
