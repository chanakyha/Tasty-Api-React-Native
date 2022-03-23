import { StyleSheet, View, SafeAreaView, TextInput } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-elements";

const RegisterScreen = ({ navigation }) => {
  const [loaderState, setLoaderState] = useState({
    login: false,
    register: false,
  });

  const [inputDetails, setInputDetails] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const onRegisterBtn = () => {
    setLoaderState({ ...loaderState, login: true });
    navigation.navigate("Login");
    setLoaderState({ ...loaderState, login: false });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={{ textAlign: "center" }} h2>
          Register
        </Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Name" />
          <TextInput style={styles.input} placeholder="Profile Pic (URL)" />
          <TextInput style={styles.input} placeholder="Email Address" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          <Button
            loading={loaderState.register}
            title="Sign Up"
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
            loading={loaderState.login}
            title="Back to Login"
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

export default RegisterScreen;

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
    width: "85%",
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
    marginVertical: 5,
    width: "110%",
  },
});
