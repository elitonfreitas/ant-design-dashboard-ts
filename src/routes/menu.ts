import { ElementType } from 'react';
import { UserOutlined, ProjectOutlined } from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import UserList from 'pages/User/List';

export interface MenuItem {
  path: string;
  title?: string;
  subTitle?: string;
  breadcrumbName?: string;
  component?: ElementType;
  icon?: ElementType;
  children?: MenuItem[];
  exact?: boolean;
  noHeader?: boolean;
  aclResource?: string;
}

const menus: MenuItem[] = [
  {
    path: '/',
    title: 'Dashboard',
    component: Dashboard,
    exact: true,
    icon: UserOutlined,
  },
  {
    path: '/users',
    title: 'Users',
    subTitle: 'Texto de teste para subtílulo da página',
    icon: ProjectOutlined,
    component: UserList,
    exact: true,
    aclResource: 'users',
  },
  // {
  //   path: '/projects',
  //   title: 'Projetos 2',
  //   icon: UserOutlined,
  //   children: [
  //     {
  //       path: '/test2',
  //       title: 'Submenu 2',
  //       icon: UploadOutlined,
  //       children: [
  //         {
  //           path: '/test2-1',
  //           title: 'Submenu 2.1',
  //           component: Dashboard,
  //           icon: UploadOutlined,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default menus;
