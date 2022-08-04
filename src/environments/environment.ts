// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let URL = "https://travelapp-802a7-default-rtdb.firebaseio.com";

export const environment = {
  production: false,
  firebase: {
    projectId: "travelapp-802a7",
    appId: "1:588614430146:web:aa4005db6824c0491d7a5b",
    storageBucket: "travelapp-802a7.appspot.com",
    apiKey: "AIzaSyBMMh4AuTgv8sYVhkCU-rqQzNZ0I4B4hN4",
    authDomain: "travelapp-802a7.firebaseapp.com",
    messagingSenderId: "588614430146",
    measurementId: "G-YZ9EQPS7DP"
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