import { FC, useContext } from 'react';
import Form from 'antd/es/form';
import Layout from 'antd/es/layout';
import Radio from 'antd/es/radio';
import Select from 'antd/es/select';
import Typography from 'antd/es/typography';
import AppContext from 'contexts/AppContext';
import { Lang } from 'i18n';
import './style.less';

const { Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface OneThemeConfigProps {
  collapsed: boolean;
}

const OneThemeConfig: FC<OneThemeConfigProps> = ({ collapsed }: OneThemeConfigProps): JSX.Element => {
  const { theme, componentSize, lang, changeTheme, t, changeLang } = useContext(AppContext);

  return (
    <Sider
      className="one-sider-bar-right"
      // trigger={null}
      theme={theme}
      collapsible
      collapsed={collapsed}
      width={350}
      collapsedWidth={0}
      style={{
        position: 'fixed',
        zIndex: 3,
        height: 'calc(100vh - 60px)',
        right: '0px',
        top: '60px',
      }}
    >
      <Form layout="vertical" style={{ padding: '24px', display: collapsed ? 'none' : 'inherit' }}>
        <Title level={3}>{t('Theme configurations')}</Title>
        <Form.Item label={t('Components size')}>
          <Radio.Group onChange={(event) => changeTheme(theme, event.target.value)} value={componentSize}>
            <Radio value="large">{t('Large')}</Radio>
            <Radio value="middle">{t('Middle')}</Radio>
            <Radio value="small">{t('Small')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('Theme')}>
          <Radio.Group onChange={(event) => changeTheme(event.target.value, componentSize)} value={theme}>
            <Radio value="light">{t('Light')}</Radio>
            <Radio value="dark">{t('dark')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('Language')}>
          <Select onSelect={(value: Lang) => changeLang(value)} defaultValue={lang}>
            <Option value="pt_br">{t('Portugese')}</Option>
            <Option value="en">{t('English')}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Sider>
  );
};

export default OneThemeConfig;
