// // const functions = require("firebase-functions");
// import { functions } from "../src/config/firebase-config";

// // // Create and deploy your first functions
// // // https://firebase.google.com/docs/functions/get-started
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });

// exports.newUserSignUp = functions.auth.user().onCreate((user) => {
//   // ../
//   console.log("user created ", user.email, user.uid);
// });
