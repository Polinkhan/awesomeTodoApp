import { LinearGradient } from "expo-linear-gradient";
import { Button, Image, StyleSheet, View } from "react-native";
import React from "react";
import CustomButton from "../Components/CustomButton";
import { BoldText, RegularText } from "../Components/Text";
import { color } from "../Colors/color";

const heroImg = require("../assets/images/Hero.png");

const HeroScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[color.primary, "#ffffff"]}
      style={styles.background}
      end={{ x: 0.6, y: 0.6 }}
    >
      <View style={styles.container}>
        <View style={styles.imgBody}>
          <Image style={styles.img} source={heroImg} />
          {/* <FastImage
            style={styles.img}
            source={heroImg}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
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
            onPress={() => {
              navigation.navigate("bottom");
            }}
          >
            Lets Start
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
