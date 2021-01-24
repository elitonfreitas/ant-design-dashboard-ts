import { FC, useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext, { AppTheme, ComponentSize } from 'contexts/AppContext';
import OneSiderBar from 'components/templates/OneSiderBar';
import OneLogin from 'components/templates/OneLogin';
import defaultService from 'services/defaultService';
import i18n, { antLang, Lang } from './i18n';
import 'themes/default.less';

const App: FC = () => {
  const [logged] = useState(true);
  const [theme, setTheme] = useState<AppTheme>('light');
  const [lang, setLang] = useState<Lang>('pt_br');
  const [componentSize, setComponentSize] = useState<ComponentSize>('middle');
  const { t } = useTranslation();

  useEffect(() => {
    defaultService.autoLogin();
  }, []);

  function changeTheme(newTheme?: AppTheme, newComponentSize?: ComponentSize) {
    setTheme(newTheme || theme);
    setComponentSize(newComponentSize || componentSize);
  }

  async function changeLang(_lang: Lang) {
    setLang(_lang);
    await i18n.changeLanguage(_lang);
  }

  return (
    <ConfigProvider locale={antLang[lang]} componentSize={componentSize}>
      <BrowserRouter>
        <AppContext.Provider value={{ theme, componentSize, lang, t, changeTheme, changeLang }}>
          {logged ? <OneSiderBar /> : <OneLogin />}
        </AppContext.Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
