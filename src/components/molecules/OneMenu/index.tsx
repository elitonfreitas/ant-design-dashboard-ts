import { FC, Key, ReactElement, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from 'antd/es/menu';
import { checkACL } from 'utils/AclUtils';
import AppContext from 'contexts/AppContext';
import { MenuItem } from '../../../routes/menu';
import './style.less';
import Constants from 'utils/Constants';

export interface OneMenuProps {
  theme: 'light' | 'dark' | undefined;
  menus: Array<MenuItem>;
}

const OneMenu: FC<OneMenuProps> = ({ theme, menus }: OneMenuProps): ReactElement => {
  const history = useHistory();
  const { t } = useContext(AppContext);
  const menuKeys: Key[] = [];
  const [openKey, setOpenKey] = useState<string[]>(['menu-1']);

  function getMenuHierarchy(item: string): string[] {
    const itemName = item ? item.split('-') : [];
    if (!itemName.length) {
      return [];
    }
    const prefix = itemName.shift();

    let lastItem = prefix;
    return itemName.map((iName: string) => {
      lastItem = `${lastItem}-${iName}`;
      return lastItem;
    });
  }

  const onOpenChange = (openKeys: any[]) => {
    const latestOpenKey: string = openKeys.find((key) => !openKey.includes(key)) || '';
    if (!menuKeys.includes(latestOpenKey)) {
      setOpenKey(openKeys);
    } else {
      const opens: string[] = getMenuHierarchy(latestOpenKey);
      setOpenKey(opens);
    }
  };

  function handleClick(path: string) {
    history.push(path);
  }

  function mapMenu(item: MenuItem, i: string, routes: MenuItem[] = []) {
    const routesList: MenuItem[] = [
      ...routes,
      {
        path: item.path,
        breadcrumbName: t(item.title || ''),
      },
    ];
    const path = routesList.map((p: MenuItem) => p.path).join('');
    const key = `menu-${i}`;
    const Icon: any = item.icon;

    if (!item.aclResource || checkACL(item.aclResource, Constants.permissions.R)) {
      if (item.component) {
        return (
          <Menu.Item key={key} icon={<Icon />} className={key} onClick={() => handleClick(path)}>
            {t(item.title || '')}
          </Menu.Item>
        );
      }
      if (item.children) {
        menuKeys.push(key);
        return (
          <Menu.SubMenu key={key} icon={<Icon />} title={t(item.title || '')}>
            {item.children.map((child, s) => mapMenu(child, `${i}-${s}`, routesList))}
          </Menu.SubMenu>
        );
      }
    }
    return null;
  }

  return (
    <Menu
      theme={theme}
      mode="inline"
      defaultSelectedKeys={['menu-0']}
      openKeys={openKey}
      onOpenChange={onOpenChange}
      style={{ borderRight: 'none' }}
    >
      {menus.map((item: MenuItem, i: number) => mapMenu(item, `${i}`, []))}
    </Menu>
  );
};

export default OneMenu;
