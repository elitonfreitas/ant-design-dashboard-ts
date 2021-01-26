import jwt from 'jwt-decode';
import Constants from './Constants';

function tokenDecode(token: string): any {
  let decoded: any = {};
  try {
    decoded = jwt(token);
  } catch (error) {}

  return decoded;
}

function checkACL(resource: string, level = 'r'): boolean {
  const token = localStorage.getItem(Constants.storage.TOKEN);
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
