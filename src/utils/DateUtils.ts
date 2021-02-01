import moment from 'moment-timezone';
moment.tz.setDefault(process.env.REACT_APP_TZ || 'America/Sao_Paulo');

export interface FilterItem {
  key: string;
  values: any[];
  type: string;
  options: string;
}

const formatDate = (date = new Date(), format = 'DD/MM/YYYY HH:mm'): string => {
  return moment(date).format(format);
};

const filterToString = (filters: FilterItem[]): string => {
  const _filters: string[] = [];

  for (const filter of filters) {
    const { key, values, type, options } = filter;

    if (key && values[0] !== undefined && type && options) {
      _filters.push(`${key}:${type};${values[0]};${options}`);
    }
    if (key && values[0] !== undefined && type && !options) {
      _filters.push(`${key}:${type};${values[0]}`);
    }
    if (key && values[0] !== undefined && !type && !options) {
      _filters.push(`${key}:${values[0]}`);
    }
  }

  return _filters.join('|');
};

export { formatDate, filterToString };
