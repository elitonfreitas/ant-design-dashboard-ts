import { FC, useContext, useState } from 'react';
import Layout from 'antd/es/layout';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import OneProfile from 'components/atoms/OneProfile';
import OneLogo from 'components/atoms/OneLogo';
import OneMenu from 'components/molecules/OneMenu';
import OneButton from 'components/atoms/OneButton';
import OneThemeConfig from 'components/organisms/OneThemeConfig';
import AppContext from 'contexts/AppContext';
import Constants from 'utils/Constants';
import Routes from '../../../routes';
import menus from '../../../routes/menu';
import logo from 'assets/logo.svg';
import './style.less';

const { Header, Sider, Footer } = Layout;

const OneSiderBar: FC = (): JSX.Element => {
  const { theme } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedRight, setCollapsedRight] = useState(true);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout className={`one-layout ${theme}`}>
      <Sider
        className="one-sider-bar-left"
        theme={theme}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        collapsedWidth={81}
        style={{
          position: 'fixed',
          zIndex: 1002,
          height: '100vh',
        }}
      >
        <OneLogo appName={Constants.app.appName} logo={logo} />
        <OneMenu theme={theme} menus={menus} />
      </Sider>
      <Layout className="one-bar-layout">
        <Header
          className="one-header-layout"
          style={{
            position: 'fixed',
            zIndex: 1000,
            width: '100vw',
            padding: 0,
          }}
        >
          <OneButton
            type="link"
            className={collapsed ? 'trigger collapsed' : 'trigger'}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
          />

          <OneProfile onClick={() => setCollapsedRight(!collapsedRight)} />
        </Header>
        <Routes collapsed={collapsed} menus={menus} />
        <Footer
          className="one-footer-layout"
          style={{
            padding: 24,
            marginLeft: collapsed ? 80 : 250,
          }}
        >
          Footer
        </Footer>
      </Layout>
      <OneThemeConfig collapsed={collapsedRight} />
    </Layout>
  );
};

export default OneSiderBar;
