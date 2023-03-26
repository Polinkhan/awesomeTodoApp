import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "347542347877-mqedk61eok6f9216r07lv2a3s8hbe75p.apps.googleusercontent.com",
  profileImageSize: 120,
});

const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const GoogleSignOut = async () => {
  await GoogleSignin.revokeAccess();
  await auth().signOut();
  return;
};

const useGoogleSignIn = () => {
  const [CurrentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.providerData[0]);
      } else setCurrentUser(undefined);
    });
    return () => unsubscribe();
  }, []);

  return {
    CurrentUser,
    GoogleSignOut,
    onGoogleButtonPress,
  };
};

export default useGoogleSignIn;
