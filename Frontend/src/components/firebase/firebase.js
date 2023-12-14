//FIREBASE
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";



export const firebaseConfig = {
    apiKey: "AIzaSyBFyGLc7ayGtqpU6rWQ3-zUK7bnlqc2uts",
    authDomain: "pf-final-henry.firebaseapp.com",
    projectId: "pf-final-henry",
    storageBucket: "pf-final-henry.appspot.com",
    messagingSenderId: "1056250886265",
    appId: "1:1056250886265:web:de0e1b9865821c2a19fca8",
    measurementId: "G-HRF4L9VW4C"
};
// export const firebaseConfig = {
//     apiKey: "AIzaSyCRhvw2OQPuphD67elZEC-AtYqW5D4_Fzk",
//     authDomain: "fitrevolution-pf.firebaseapp.com",
//     projectId: "fitrevolution-pf",
//     storageBucket: "fitrevolution-pf.appspot.com",
//     messagingSenderId: "920630152854",
//     appId: "1:920630152854:web:93c5ce8572a5e61bce7cb7",
//     measurementId: "G-EZYY3CHK0X"
//   };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export { auth, providerGoogle, providerFacebook };
//--------