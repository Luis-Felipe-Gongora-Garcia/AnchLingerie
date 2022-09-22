import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Banner, SideMenu } from './shared/components';
import {
  AppThemeProvider,
  DrawerProvider,
  FilterProvider,
} from './shared/contexts';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <Banner>
              <FilterProvider>
                <AppRoutes />
              </FilterProvider>
            </Banner>
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
