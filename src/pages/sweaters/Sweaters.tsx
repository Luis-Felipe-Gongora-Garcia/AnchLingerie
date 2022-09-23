import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Sweaters: React.FC = () => {
  return (
    <LayoutBasePage
      title='Camisolas'
      toolbar={<ToolList showFilter showSearchText />}
    ></LayoutBasePage>
  );
};
