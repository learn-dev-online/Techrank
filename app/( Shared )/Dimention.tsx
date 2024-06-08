import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth > 500 ? "70%" : "90%",
    height: windowHeight > 600 ? "60%" : "90%",
  },
});