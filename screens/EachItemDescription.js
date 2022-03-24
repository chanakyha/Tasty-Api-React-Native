import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Text, Button } from "react-native-elements";

const EachItemDescription = (props) => {
  const [recipieData, setRecipieData] = useState();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
      params: { id: props.route.params.id },
      headers: {
        "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        "X-RapidAPI-Key": "af2bb18cccmsh4ee137de9cad492p1371f5jsn51617ac50faa",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setRecipieData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {recipieData ? (
        <View style={styles.contentContainer}>
          <Avatar source={{ uri: recipieData.thumbnail_url }} size={165} />
          <Text
            style={{
              backgroundColor: "#fff",
              padding: 10,
              margin: 10,
              marginBottom: 0,
              elevation: 5,
              borderRadius: 20,
            }}
          >
            Country: {recipieData.country}
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10, padding: 5 }} h3>
            {recipieData.name}
          </Text>
          <Text
            h5
            style={{
              padding: 20,
              backgroundColor: "white",
              margin: 10,
              borderRadius: 20,
              elevation: 3,
            }}
          >
            {recipieData.description || "No Description"}
          </Text>

          <View style={styles.instructions}>
            <Text h4 style={{ textAlign: "center" }}>
              Sections
            </Text>
            {recipieData.sections.map((i) => (
              <View style={{ marginTop: 15 }}>
                <Text h4>
                  {i.position}) {i.name}
                </Text>
                <View style={{ marginLeft: 5 }}>
                  {i.components.map((j) => (
                    <Text>
                      {j.position}) {j.raw_text}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <View style={styles.instructions}>
            <Text h4 style={{ textAlign: "center" }}>
              Instructions
            </Text>
            {recipieData.instructions.map((i) => (
              <Text>
                {i.position}. {i.display_text}
              </Text>
            ))}
          </View>

          <View style={styles.instructions}>
            <Button
              title="View Recipie Video"
              onPress={() => Linking.openURL(recipieData.original_video_url)}
              type="outline"
              titleStyle={{
                color: "#fff",
                marginHorizontal: 20,
              }}
              buttonStyle={{ backgroundColor: "#000", borderColor: "#fff" }}
              containerStyle={{ marginTop: 3 }}
            />
            <View style={styles.instructions}>
              <Text h4 style={{ textAlign: "center" }}>
                Nutrition
              </Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Carbohydrates: </Text>
                {recipieData.nutrition.carbohydrates || "Not Mentioned"} {"\n"}
                <Text style={{ fontWeight: "bold" }}>Fiber: </Text>
                {recipieData.nutrition.fiber || "Not Mentioned"} {"\n"}
                <Text style={{ fontWeight: "bold" }}>Protein: </Text>
                {recipieData.nutrition.protein || "Not Mentioned"} {"\n"}
                <Text style={{ fontWeight: "bold" }}>Fat: </Text>
                {recipieData.nutrition.fat || "Not Mentioned"} {"\n"}
                <Text style={{ fontWeight: "bold" }}>Calories: </Text>
                {recipieData.nutrition.calories || "Not Mentioned"} {"\n"}
                <Text style={{ fontWeight: "bold" }}>Sugar: </Text>
                {recipieData.nutrition.sugar || "Not Mentioned"} {"\n"}
              </Text>
            </View>
            <View style={styles.instructions}>
              <Text h4 style={{ textAlign: "center" }}>
                Credits
              </Text>
              {recipieData.credits.map((i) => (
                <Text>
                  {i.name} - {i.type}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.instructions}>
            <Text h4 style={{ textAlign: "center" }}>
              Reviews
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                containerStyle={{ margin: 10 }}
                source={{
                  uri: "https://pngpress.com/wp-content/uploads/2020/09/uploads_like_like_PNG13.png",
                }}
                size={30}
              />
              <Text>{recipieData.user_ratings.count_positive}</Text>
              <Avatar
                containerStyle={{ margin: 10 }}
                source={{
                  uri: "https://www.freeiconspng.com/thumbs/youtube-dislike-png/black-and-white-youtube-dislike-png-icon-22.png",
                }}
                size={30}
              />
              <Text>{recipieData.user_ratings.count_negative}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                containerStyle={{ margin: 10 }}
                source={{
                  uri: "https://starpng.com/public/uploads/preview/golden-star-transparent-background-png-10157703230079iwcosysn.png",
                }}
                size={30}
              />
              <Text>{recipieData?.user_ratings?.score?.toFixed(2)}</Text>
              <Avatar
                onPress={() => {
                  liked ? setLiked(false) : setLiked(true);
                }}
                containerStyle={{ margin: 10 }}
                source={{
                  uri: liked
                    ? "https://www.freeiconspng.com/thumbs/heart-icon/valentine-heart-icon-6.png"
                    : "https://www.freeiconspng.com/thumbs/heart-icon/heart-outline-19.png",
                }}
                size={30}
              />
            </View>
          </View>
          <ScrollView horizontal style={styles.instructions}>
            <Text h4 style={{ textAlign: "center", margin: 10 }}>
              Tags:
            </Text>
            {recipieData.tags.map((i) => (
              <Text
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: "grey",
                  color: "#fff",
                  borderRadius: 20,
                  elevation: 4,
                }}
              >
                {i.display_name}
              </Text>
            ))}
            <View style={{ width: 20 }}></View>
          </ScrollView>
          <View style={{ height: 100 }} />
        </View>
      ) : (
        <View>
          <ActivityIndicator color="#000" size="large" />
        </View>
      )}
    </ScrollView>
  );
};

export default EachItemDescription;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    elevation: 3,
    borderRadius: 20,
  },
});
