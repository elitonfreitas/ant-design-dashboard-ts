import { Lang } from 'i18n';
import React from 'react';

export type AppTheme = 'light' | 'dark' | undefined;
export type ComponentSize = 'large' | 'middle' | 'small' | undefined;

export interface Theme {
  theme: AppTheme;
  componentSize: ComponentSize;
  lang: Lang;
  t(key: string): string;
  changeTheme(theme: AppTheme, componentSize: ComponentSize): void;
  changeLang(theme: Lang): void;
}

const AppContext = React.createContext<Theme>({
  theme: 'light',
  componentSize: 'middle',
  lang: 'pt_br',
  t: () => '',
  changeTheme: () => {},
  changeLang: () => {},
});

export default AppContext;
