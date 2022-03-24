export const environment = {
  production: true,
  SERVER_API_URL: 'http://' + window.location.hostname,
  SERVER_API_CONTEXT: '/',
  GRAFANA_URL: 'http://' + window.location.hostname + '/dashboard/?search=open&orgId=1',
  PROMETHEUS_URL: 'http://' + window.location.hostname + '/prometheus/',
  FILEBROWSER_URL: 'http://' + window.location.hostname + '/rules/',
  SESSION_AUTH_TOKEN: window.location.host.split(':')[0].toLocaleUpperCase(),
  BUILD_TIMESTAMP: new Date().getTime(),
  DEBUG_INFO_ENABLED: true,
  VERSION: '0.0.1'
};
