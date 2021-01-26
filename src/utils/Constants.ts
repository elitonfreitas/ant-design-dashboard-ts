const Constants = {
  app: {
    appName: process.env.REACT_APP_NAME || 'Ant Admin',
  },
  storage: {
    TOKEN: 'ANT-DASHBOARD-TOKEN',
    LANG: 'ANT-DASHBOARD-LANG',
    LOGGED: 'ANT-DASHBOARD-LOGGED',
  },
  api: {
    AUTH: 'auth',
    USERS: 'users',
    PROFILES: 'profiles',
  },
  message: {
    INVALID_TOKEN: 'Invalid token',
  },
};

export default Constants;
