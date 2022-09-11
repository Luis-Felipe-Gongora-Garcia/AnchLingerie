import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Sweaters = () => {
  return (
    <LayoutBasePage
      title='Camisolas'
      toolbar={<ToolList showFilter showSearchText />}
    >
      Testando
    </LayoutBasePage>
  );
};
