// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDYv0H5RXmoYQduJjudu_-ckWqLLDUHKhk",
    authDomain: "test-96155.firebaseapp.com",
    databaseURL: "https://test-96155-default-rtdb.firebaseio.com",
    projectId: "test-96155",
    storageBucket: "test-96155.appspot.com",
    messagingSenderId: "6579512422",
    appId: "1:6579512422:web:83151b2eb41bbcc35d79a7",
    measurementId: "G-9402P23G8N"
  }
};

// FireBase settings
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
