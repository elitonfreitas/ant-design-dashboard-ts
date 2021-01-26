import { FC, ReactElement, useContext, useState } from 'react';
import { Alert, Button, Checkbox, Col, Form, Image, Input, Typography } from 'antd';
import defaultService from 'services/defaultService';
import AppContext from 'contexts/AppContext';
import Constants from 'utils/Constants';
import { tokenDecode } from 'utils/AclUtils';
import logo from 'assets/logo.svg';
import './style.less';

interface Login {
  email: string;
  password: string;
}
interface LoginProps {
  onLogin(logged: boolean): void;
}

const OneLogin: FC<LoginProps> = ({ onLogin }: LoginProps): ReactElement => {
  const { t } = useContext(AppContext);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const onFinish = async (values: Login) => {
    const response = await defaultService.post(Constants.api.AUTH, values);

    if (response.error) {
      setErrorMessages(response.error);
    } else {
      console.log(response);
      localStorage.setItem(Constants.storage.TOKEN, response.token);
      const decoded = tokenDecode(response.token);
      localStorage.setItem(Constants.storage.USER, JSON.stringify(decoded.user));
      onLogin(true);
    }
  };

  return (
    <div className="one-login-wrapper">
      <Form className="one-login" name="login" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
        <div className="one-login-logo">
          <Image src={logo} />
          <Typography>{Constants.app.appName}</Typography>
        </div>

        <Col md={24}>
          {errorMessages.map((error: string, i: number) => {
            return (
              <Alert
                key={Math.random()}
                message={error}
                showIcon
                closable
                type={'error'}
                style={{ marginBottom: '24px' }}
                afterClose={() => {
                  const newErros = [...errorMessages];
                  newErros.splice(i, 1);
                  setErrorMessages(newErros);
                }}
              />
            );
          })}
        </Col>

        <Form.Item
          label={t('Username')}
          name="email"
          rules={[{ required: true, message: t('Please input your email!') }]}
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
