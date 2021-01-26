import { FC, useState } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext, { AppTheme, ComponentSize } from 'contexts/AppContext';
import OneSiderBar from 'components/templates/OneSiderBar';
import OneLogin from 'components/templates/OneLogin';
import i18n, { antLang, Lang } from './i18n';
import Constants from 'utils/Constants';
import 'themes/default.less';

const App: FC = () => {
  const [logged, setLogged] = useState(Boolean(JSON.parse(localStorage.getItem(Constants.storage.LOGGED) || 'false')));
  const [theme, setTheme] = useState<AppTheme>('light');
  const [lang, setLang] = useState<Lang>('pt_br');
  const [componentSize, setComponentSize] = useState<ComponentSize>('middle');
  const { t } = useTranslation();

  function changeTheme(newTheme?: AppTheme, newComponentSize?: ComponentSize) {
    setTheme(newTheme || theme);
    setComponentSize(newComponentSize || componentSize);
  }

  function changeLogin(_logged: boolean) {
    setLogged(_logged);
    localStorage.setItem(Constants.storage.LOGGED, `${_logged}`);
  }

  async function changeLang(_lang: Lang) {
    setLang(_lang);
    localStorage.setItem(Constants.storage.LANG, _lang.replaceAll('_', '-'));
    await i18n.changeLanguage(_lang);
  }

  return (
    <ConfigProvider locale={antLang[lang]} componentSize={componentSize}>
      <BrowserRouter>
        <AppContext.Provider value={{ theme, componentSize, lang, t, changeTheme, changeLang }}>
          {logged ? <OneSiderBar /> : <OneLogin onLogin={changeLogin} />}
        </AppContext.Provider>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
