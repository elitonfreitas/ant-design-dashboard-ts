import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { ProjectOutlined } from '@ant-design/icons';
import OneLoader from 'components/atoms/OneLoader';
import AppContext from 'contexts/AppContext';
import './style.less';

const { TextArea } = Input;
const { Title } = Typography;

interface ArticleCreateProps {
  visible: boolean;
  setVisible(status: boolean): void;
}

const ArticleCreate: FC<ArticleCreateProps> = (props: ArticleCreateProps): ReactElement => {
  const { visible, setVisible } = props;
  const { t } = useContext(AppContext);
  const [loading] = useState(false);
  const [form] = Form.useForm();

  const save = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      title={
        <Title level={3} className="one-modal-title">
          <ProjectOutlined /> {t('New article')}
        </Title>
      }
      width={'60vw'}
      visible={visible}
      zIndex={1005}
      style={{ top: 20 }}
      onCancel={() => setVisible(false)}
      onOk={() => save()}
    >
      <OneLoader show={loading} />
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          tower: '',
          industry: '',
          type: '',
          servicetype: '',
          building: '',
        }}
      >
        <Row gutter={24}>
          <Col md={12}>
            <Form.Item
              label={t('Project title')}
              name="title"
              required
              rules={[{ required: true, message: t('Please type the article title') }]}
            >
              <Input placeholder={t('Type the article title')} />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              label={t('Author')}
              name="author"
              required
              rules={[{ required: true, message: t('Please type the client name') }]}
            >
              <Input placeholder={t('Client name')} />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label={t('Article text')} name="text">
              <TextArea rows={20} />
            </Form.Item>
          </Col>
          <Col md={24}>
            <Form.Item label={t('Tags')} name="tags">
              <Select
                mode="tags"
                allowClear
                listHeight={0}
                style={{ width: '100%' }}
                dropdownStyle={{ display: 'none' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ArticleCreate;
