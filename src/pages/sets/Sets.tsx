import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Sets = () => {
  return (
    <LayoutBasePage
      title='Conjuntos'
      toolbar={<ToolList showFilter showSearchText />}
    >
      Testando
    </LayoutBasePage>
  );
};
