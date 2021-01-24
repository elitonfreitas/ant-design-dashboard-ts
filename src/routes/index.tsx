import { FC, ReactElement, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuItem } from './menu';
import OnePageHeader from '../components/atoms/OnePageHeader';
import AppContext from 'contexts/AppContext';

const { Content } = Layout;

interface RoutesProps {
  collapsed?: boolean;
  menus: MenuItem[];
}

const Routes: FC<RoutesProps> = ({ collapsed, menus }: RoutesProps): ReactElement => {
  const { t } = useContext(AppContext);

  function mapMenu(item: MenuItem, i: string, routes: MenuItem[] = []): any {
    const routesList: MenuItem[] = [
      ...routes,
      {
        path: item.path,
        breadcrumbName: t(item.title || ''),
      },
    ];
    const path = routesList.map((it) => it.path).join('');

    if (item.component) {
      const Component: React.ElementType = item.component;
      return (
        <Route
          key={i}
          path={path}
          exact={!!item.exact}
          component={() => (
            <Content
              className="one-layout-content"
              style={{
                marginTop: 90,
                marginLeft: collapsed ? 104 : 274,
              }}
            >
              {!item.noHeader && <OnePageHeader title={t(item.title || '')} subTitle={t(item.subTitle || '')} />}
              <Component />
            </Content>
          )}
        />
      );
    }
    if (item.children) {
      return item.children.map((child, s) => mapMenu(child, `${i}-${s}`, routesList));
    }
    return null;
  }

  return <Switch>{menus.map((item: MenuItem, i: number) => mapMenu(item, `${i}`, []))}</Switch>;
};

export default Routes;