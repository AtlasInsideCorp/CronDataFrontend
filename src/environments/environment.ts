// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_API_URL: 'http://localhost:8080/',
  // SERVER_API_URL: 'http://crondata.atlasinside.com/',
  SERVER_API_CONTEXT: '',
  // SERVER_API_CONTEXT: 'crondata/',
  BUILD_TIMESTAMP: new Date().getTime(),
  GRAFANA_URL: 'http://grafana.' + 'crondata.atlasinside.com' + '/',
  PROMETHEUS_URL: 'http://prometheus.' + 'crondata.atlasinside.com' + '/',
  FILEBROWSER_URL: 'http://filebrowser.' + 'crondata.atlasinside.com' + '/',
  SESSION_AUTH_TOKEN: window.location.host.split(':')[0].toLocaleUpperCase(),
  DEBUG_INFO_ENABLED: true,
  VERSION: '0.0.1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
