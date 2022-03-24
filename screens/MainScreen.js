import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Avatar, Button } from "react-native-elements";
import axios from "axios";

const MainScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [sampleData, setSampleData] = useState();
  const [loaderState, setLoaderState] = useState(false);

  const onSearch = (text) => {
    setSearch(text);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/auto-complete",
      params: { prefix: search },
      headers: {
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        "X-RapidAPI-Key": "af2bb18cccmsh4ee137de9cad492p1371f5jsn51617ac50faa",
      },
    };

    if (autoCompleteData.length !== 1) {
      axios
        .request(options)
        .then(function (response) {
          setAutoCompleteData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [search]);

  const onSearchBtn = () => {
    setLoaderState(true);
    if (search != "") {
      const options = {
        method: "GET",
        url: "https://tasty.p.rapidapi.com/recipes/list",
        params: { from: "0", size: "20", q: search },
        headers: {
          "X-RapidAPI-Host": "tasty.p.rapidapi.com",
          "X-RapidAPI-Key":
            "af2bb18cccmsh4ee137de9cad492p1371f5jsn51617ac50faa",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setSampleData(response.data);
          setAutoCompleteData([]);
          setLoaderState(false);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={onSearch}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "whitesmoke",
            marginBottom: 15,
          }}
        />
        <Button
          onPress={onSearchBtn}
          title="Search"
          type="outline"
          titleStyle={{
            color: "#fff",
            marginHorizontal: 20,
          }}
          buttonStyle={{ backgroundColor: "#000", borderColor: "#000" }}
          containerStyle={{ marginTop: 3 }}
          loadingProps={{
            size: "small",
            color: "#fff",
          }}
          loading={loaderState}
        />
        <View style={styles.searchResults}>
          {autoCompleteData.length != 0 ? (
            autoCompleteData.results.map((items) => (
              <Text style={{ color: "grey" }}>{items.display}</Text>
            ))
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <ScrollView style={styles.recipies}>
        {sampleData ? (
          sampleData.results != 0 ? (
            sampleData.results.map((items) => (
              <View style={styles.eachItemContainer}>
                <Avatar
                  source={{ uri: items.thumbnail_url }}
                  avatarStyle={{ borderRadius: 8 }}
                  size={164}
                />
                <Text
                  style={{
                    backgroundColor: "whitesmoke",
                    padding: 10,
                    margin: 8,
                    borderRadius: 20,
                    elevation: 4,
                  }}
                >
                  Country: {items.country}
                </Text>
                <Text h4>{items.name}</Text>
                <Button
                  onPress={() => navigation.navigate("Item", { id: items.id })}
                  title="View More.."
                  type="outline"
                  titleStyle={{
                    color: "grey",
                    marginHorizontal: 20,
                  }}
                  buttonStyle={{ backgroundColor: "#fff", borderColor: "#fff" }}
                  containerStyle={{ marginTop: 3 }}
                />
              </View>
            ))
          ) : (
            <ActivityIndicator color="#000" size="large" />
          )
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "red",
              }}
            >
              Use the Search Bar to get the Recipies
            </Text>
          </View>
        )}
        <View style={{ height: 200 }}></View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    padding: 10,
    paddingHorizontal: 15,
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
  },
  searchResults: {
    marginTop: 20,
  },
  recipies: {},
  eachItemContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
});
