

const host = 'http://192.168.1.3/'
const tokens = {
  prefix: 'water/do/monitor/1/app',
  account: 'v1',
  admin: 'water/do/admin'
};
const urls = {
  login: '{admin}/{account}/login/user/login.do',
  phone_login: '{admin}/{account}/login/user/mobile/login.do',
  vertify_code: '{admin}/public/login/vertify-code/send.do',
  meter_online: '{prefix}/meter/online/list.do',
  warn_list: '{prefix}/warn/list.do'
};

export function getUrl( url ) {
  let string = urls[url];
  if ( string ) {
    Object.keys( tokens ).forEach(( token ) => {
      string = string.replace( `{${token}}`, tokens[token]);
    });
    return host + string;
  }
  return '';
}

export function addToken( token, value ) {
  tokens[token] = value;
}

export function delToken( token ) {
  delete tokens[token];
}