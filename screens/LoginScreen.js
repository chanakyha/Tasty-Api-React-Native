import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [loaderState, setLoaderState] = useState({
    login: false,
    register: false,
  });

  const onRegisterBtn = () => {
    setLoaderState({ ...loaderState, register: true });
    navigation.navigate("Register");
    setLoaderState({ ...loaderState, register: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={{ textAlign: "center" }} h2>
          Login
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Email Address" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <Button
            loading={loaderState.login}
            title="Login"
            type="solid"
            titleStyle={{ color: "#fff", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#000" }}
            containerStyle={{ marginTop: 10 }}
            loadingProps={{
              size: "small",
              color: "#fff",
            }}
          />
          <Button
            loading={loaderState.register}
            title="Register"
            type="outline"
            titleStyle={{ color: "#000", marginHorizontal: 20 }}
            buttonStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
            containerStyle={{ marginTop: 3 }}
            loadingProps={{
              size: "small",
              color: "#000",
            }}
            onPress={onRegisterBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loginContainer: {
    backgroundColor: "#fff",
    padding: 45,
    borderRadius: 20,
    width: "75%",
  },
  inputContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "whitesmoke",
    paddingLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    width: "110%",
  },
});
