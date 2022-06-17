// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let URL = "https://travel-app-v2-1f864-default-rtdb.firebaseio.com/";
export const environment = {
  production: false,
  firebase: {
    projectId: 'travel-app-v2-1f864',
    appId: '1:890017208620:web:9fb9c0caee6212156df489',
    storageBucket: 'travel-app-v2-1f864.appspot.com',
    apiKey: 'AIzaSyAMb5CnyHXselqd7bt6neacEIM9DINEeUw',
    authDomain: 'travel-app-v2-1f864.firebaseapp.com',
    messagingSenderId: '890017208620',
    measurementId: 'G-ZJQBLWDW8L',
  },
  urlConfing:{
    USERURL: `${URL}user-api`,
    DRIVERTURL: `${URL}driver-api`,
    MOVEMENTURL: `${URL}movement-api`,
    PQRSURL: `${URL}pqrs-api`,
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
