import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Text } from "react-native-elements";
import { auth } from "../utils/firebase";

const LogoTitle = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails(user);
      }
    });
  }, []);

  const onSignOut = () => {
    Alert.alert("Sign Out", "Do you want to Sign Out", [
      { text: "No" },
      {
        text: "Yes",
        onPress: () => {
          auth.signOut();
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text h4>Tasty Recipies</Text>
      {userDetails.photoURL ? (
        <Avatar
          source={{ uri: userDetails.photoURL || "" }}
          size={40}
          rounded
          containerStyle={styles.avatar}
          onLongPress={onSignOut}
        />
      ) : (
        <Avatar
          title={userDetails.displayName ? userDetails.displayName[0] : "NA"}
          size={40}
          rounded
          containerStyle={styles.avatar}
          onLongPress={onSignOut}
        />
      )}
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
    backgroundColor: "#000",
  },
});
