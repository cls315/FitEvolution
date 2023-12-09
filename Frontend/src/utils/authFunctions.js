import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth, providerGoogle, providerFacebook} from "../components/firebase/firebase";



const callLoginGoogle = async () => {
  const result = await signInWithPopup(auth, providerGoogle);
  // Extract necessary data from the result if needed
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  return user
  // Perform actions after successful login
  console.log(auth);
  // Add additional logic as needed based on the typeSession

};

const callLoginFacebook = async () => {
  
  const result = await signInWithPopup(auth, providerFacebook);
  // Extract necessary data from the result if needed
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  return user
  // Perform actions after successful login
  console.log(auth);
  // Add additional logic as needed based on the typeSession
}
  
  export { callLoginGoogle, callLoginFacebook };

