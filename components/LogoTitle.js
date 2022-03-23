import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Text } from "react-native-elements";

const LogoTitle = () => {
  return (
    <View style={styles.container}>
      <Text h4>Tasty Recipies</Text>
      <Avatar title="H" size={40} rounded containerStyle={styles.avatar} />
    </View>
  );
};

export default LogoTitle;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: "coral",
  },
});
