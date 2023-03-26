import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "../Components/CustomButton";
import { BoldText, RegularText } from "../Components/Text";
import { color } from "../Colors/color";
import useGoogleSignIn from "../Hooks/useGoogleSignIn";
import FastImage from "react-native-fast-image";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const heroImg = require("../assets/images/Hero.png");

const HeroScreen = () => {
  const [loading, setLoading] = useState(false);
  const { CurrentUser, onGoogleButtonPress } = useGoogleSignIn();

  const handleSignIn = async () => {
    setLoading(true);
    await onGoogleButtonPress()
      .catch(async (e) => {
        e.code !== "12501" && GoogleSignin.revokeAccess();
        ToastAndroid.show(e.message, ToastAndroid.LONG);
      })
      .finally(() => setLoading(false));
  };

  return (
    <LinearGradient
      colors={[color.primary, "#ffffff"]}
      style={styles.background}
      end={{ x: 0.6, y: 0.6 }}
    >
      <View style={styles.container}>
        <View style={styles.imgBody}>
          <FastImage
            style={styles.img}
            source={heroImg}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.body}>
          <View>
            <BoldText style={{ fontSize: 24, textAlign: "center" }}>
              Welcome to TODO APP
            </BoldText>
            <RegularText style={{ color: "gray", textAlign: "center" }}>
              Welcome to TODO APP
            </RegularText>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CustomButton
            style={{ flex: 1 }}
            isLoading={loading}
            isLoadingText={"Singing in ..."}
            onPress={handleSignIn}
          >
            Sign In With Google
          </CustomButton>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HeroScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 40,
    flex: 1,
    alignItems: "center",
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
  },
  imgBody: {
    flex: 2,
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "contain",
    width: 300,
  },
});
