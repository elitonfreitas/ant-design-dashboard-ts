import jwt from 'jwt-decode';
import { sls } from './StorageUtils';
import Constants from './Constants';

function tokenDecode(token: string): any {
  let decoded: any = {};
  try {
    decoded = jwt(token);
  } catch (error) {}

  return decoded;
}

function checkACL(resource: string, level = 'r'): boolean {
  if (!JSON.parse(process.env.REACT_APP_ACL || 'false')) {
    return true;
  }
  const token = sls.getItem(Constants.storage.TOKEN);
  if (!token) {
    return false;
  }

  let decoded: any = {};
  try {
    decoded = jwt(token);
  } catch (error) {}

  const permissions = decoded.acl;
  const levels: any = {
    r: ['r', 'w', 'm'],
    w: ['w', 'm'],
    m: ['m'],
  };

  return levels[level].includes(permissions[resource]);
}

export { checkACL, tokenDecode };
