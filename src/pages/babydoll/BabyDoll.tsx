import { ToolList } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const BabyDoll = () => {
  return (
    <LayoutBasePage
      title='BabyDoll'
      toolbar={<ToolList showFilter showSearchText />}
    >
      Testando
    </LayoutBasePage>
  );
};
