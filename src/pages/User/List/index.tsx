import { FC, useContext, useEffect, useState } from 'react';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Layout from 'antd/es/layout';
import Switch from 'antd/es/switch';
import Table from 'antd/es/table';
import Tooltip from 'antd/es/tooltip';
import Row from 'antd/es/row';
import { EditOutlined, SearchOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Profile, User } from 'interfaces';
import { formatDate } from 'utils/DateUtils';
import AppContext from 'contexts/AppContext';
import UserCreate from 'pages/User/Create';
import defaultService from 'services/defaultService';
import { checkACL } from 'utils/AclUtils';
import Constants from 'utils/Constants';
import './style.less';

const { Content } = Layout;
const { Column } = Table;

const UserList: FC = (): JSX.Element => {
  const { t } = useContext(AppContext);
  const [users, setUsers] = useState<User[]>([]);
  const [userEdit, setUserEdit] = useState<User>();
  const [userList, setUserList] = useState<User[]>([]);
  const [createVisible, setCreateVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('initial');
  const [active, setActive] = useState(true);
  const [reload, setReload] = useState('');
  const [form] = Form.useForm();

  const getUsers = async () => {
    setLoading(true);
    const response = await defaultService.get(Constants.api.USERS, []);
    await setUsers(response);
    setLoading(false);
    setTerm('');
  };

  const filterUser = (): void => {
    const filteredUsers: User[] = users
      .filter((u: User) => !term || u?.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
      .filter((u: User) => u?.active === active);

    setUserList(filteredUsers);
  };

  const callFilter = () => {
    const values = form.getFieldsValue();
    setActive(values['activeUser']);
    setTerm(values['term']);
  };

  const reloadUsers = async (_reload: boolean) => {
    if (_reload) {
      setReload(`${Math.random()}`);
      form.resetFields();
    }
  };

  useEffect(() => {
    filterUser();
  }, [term, active, loading]);

  useEffect(() => {
    getUsers();
  }, [, reload]);

  return (
    <>
      <Content>
        <Row>
          <Col span={20}>
            <Form
              layout="inline"
              form={form}
              initialValues={{ term: '', activeUser: active }}
              onFieldsChange={() => callFilter()}
            >
              <Form.Item style={{ width: 250 }} name="term">
                <Input
                  allowClear
                  suffix={<SearchOutlined style={{ color: '@primary-color' }} />}
                  placeholder={t('Search user')}
                />
              </Form.Item>
              <Form.Item label={t('Active')} name="activeUser" valuePropName="checked">
                <Switch checkedChildren={t('Yes')} unCheckedChildren={t('No')} />
              </Form.Item>
              <Form.Item name="download">
                <Tooltip title={t('Download .xlsx')} placement="top">
                  <Button icon={<DownloadOutlined />} type="primary" />
                </Tooltip>
              </Form.Item>
            </Form>
          </Col>
          {checkACL(Constants.acl.users, Constants.permissions.W) ? (
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setUserEdit(undefined);
                  setCreateVisible(true);
                }}
              >
                {t('New user')}
              </Button>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Content>

      <Content className="one-page-user-list">
        <Table
          loading={loading}
          dataSource={userList}
          scroll={{ x: 1200 }}
          rowKey={'_id'}
          pagination={{
            position: ['topRight', 'bottomRight'],
            total: userList.length,
            showTotal: (total: number, range: number[]) =>
              `${range[0]} - ${range[1]} ${t('of')} ${total} ${t('items')}`,
            defaultPageSize: 20,
          }}
        >
          <Column title={t('Name')} dataIndex="name" width={180} />
          <Column title={t('Email')} dataIndex="email" width={180} />
          <Column
            title={t('Profiles')}
            dataIndex="profiles"
            width={90}
            render={(_: string, item: User) => item.profiles.map((p: Profile) => (p.name ? p.name : p)).join(', ')}
          />
          <Column
            title={t('Active')}
            dataIndex="active"
            width={90}
            render={(_: string, item: User) => (item.active ? t('Yes') : t('No'))}
          />
          <Column
            title={t('Created At')}
            dataIndex="createdAt"
            width={90}
            render={(_: string, item: User) => formatDate(item.createdAt)}
          />
          <Column
            title={t('Updated At')}
            dataIndex="updatedAt"
            width={90}
            render={(_: string, item: User) => formatDate(item.updatedAt)}
          />
          {checkACL(Constants.acl.users, Constants.permissions.W) ? (
            <Column
              title={t('Edit')}
              dataIndex={'edit'}
              width={50}
              fixed={'right'}
              align={'center'}
              render={(_: string, item: User) => (
                <Button
                  onClick={() => {
                    setCreateVisible(true);
                    setUserEdit(item);
                  }}
                  icon={<EditOutlined />}
                  type="primary"
                  shape="circle"
                ></Button>
              )}
            />
          ) : null}
        </Table>
      </Content>

      <UserCreate
        visible={createVisible}
        reload={reloadUsers}
        setUser={setUserEdit}
        setVisible={setCreateVisible}
        user={userEdit}
      />
    </>
  );
};

export default UserList;
