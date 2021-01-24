import { FC, useContext, useEffect, useState } from 'react';
import { Button, Form, Layout, Input, Switch, Table, Tooltip, Row, Col } from 'antd';
import { EditOutlined, SearchOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Article } from 'interfaces';
import { formatDate } from 'utils/DateUtils';
import AppContext from 'contexts/AppContext';
import ArticleCreate from 'pages/Article/Create';
import defaultService from 'services/defaultService';
import Constants from 'utils/Constants';
import './style.less';

const { Content } = Layout;
const { Column } = Table;

const ArticleList: FC = (): JSX.Element => {
  const { t } = useContext(AppContext);
  const [articles, setProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('init');
  const [active, setActive] = useState(true);
  const [createVisible, setCreateVisible] = useState(false);

  const getArticles = async () => {
    setLoading(true);
    const response = await defaultService.get(Constants.api.ARTICLES, []);
    await setProjects(response);
    setLoading(false);
    setTerm('');
  };

  const filterArticle = (): void => {
    const filteredArticles = articles
      .filter((p: Article) => !term || p.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
      .filter((p: Article) => !active || p.active === active);

    setProjectList(filteredArticles);
  };

  useEffect(() => {
    filterArticle();
  }, [term]);

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <Content>
        <Row>
          <Col span={20}>
            <Form layout="inline">
              <Form.Item style={{ width: 250 }}>
                <Input
                  allowClear
                  suffix={<SearchOutlined style={{ color: '@primary-color' }} />}
                  placeholder={t('Search article')}
                  onChange={(event) => setTerm(event.target.value.length >= 2 ? event.target.value : '')}
                />
              </Form.Item>
              <Form.Item label={t('Active')}>
                <Switch
                  checkedChildren={t('Yes')}
                  unCheckedChildren={t('No')}
                  defaultChecked={active}
                  onChange={(value) => setActive(value)}
                />
              </Form.Item>
              <Form.Item>
                <Tooltip title={t('Download .xlsx')} placement="top">
                  <Button icon={<DownloadOutlined />} type="primary" />
                </Tooltip>
              </Form.Item>
            </Form>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Button icon={<PlusOutlined />} type="primary" onClick={() => setCreateVisible(true)}>
              {t('New article')}
            </Button>
          </Col>
        </Row>
      </Content>
      <Content className="one-page-article-list">
        <Table
          loading={loading}
          dataSource={projectList}
          scroll={{ x: 1200 }}
          rowKey={'_id'}
          pagination={{
            position: ['topRight', 'bottomRight'],
            total: projectList.length,
            showTotal: (total: number, range: number[]) =>
              `${range[0]} - ${range[1]} ${t('of')} ${total} ${t('items')}`,
            defaultPageSize: 20,
          }}
        >
          <Column title={t('Article title')} dataIndex="title" width={180} />
          <Column title={t('Author')} dataIndex="author" width={90} align={'center'} />
          <Column
            title={t('Created At')}
            dataIndex="createdAt"
            width={90}
            render={(_: string, item: Article) => formatDate(item.createdAt)}
          />
          <Column
            title={t('Updated At')}
            dataIndex="updatedAt"
            width={90}
            render={(_: string, item: Article) => formatDate(item.updatedAt)}
          />
          <Column
            title={t('Edit')}
            dataIndex={'edit'}
            width={50}
            fixed={'right'}
            align={'center'}
            render={() => <Button icon={<EditOutlined />} type="primary" shape="circle"></Button>}
          />
        </Table>
      </Content>
      <ArticleCreate visible={createVisible} setVisible={setCreateVisible} />
    </>
  );
};

export default ArticleList;
