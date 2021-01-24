import { FC, ReactElement, useContext } from 'react';
import { Button, Checkbox, Form, Image, Input, Typography } from 'antd';
import AppContext from 'contexts/AppContext';
import Constants from 'utils/Constants';
import logo from 'assets/logo.svg';
import './style.less';

const OneLogin: FC = (): ReactElement => {
  const { t } = useContext(AppContext);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="one-login-wrapper">
      <Form
        className="one-login"
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="one-login-logo">
          <Image src={logo} />
          <Typography>{Constants.app.appName}</Typography>
        </div>

        <Form.Item
          label={t('Username')}
          name="username"
          rules={[{ required: true, message: t('Please input your username!') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Password')}
          name="password"
          rules={[{ required: true, message: t('Please input your password!') }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>{t('Remember me')}</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('Submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OneLogin;
