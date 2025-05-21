import { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text style={{ marginBottom: 8 }}>Enter image URL:</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://example.com/image.jpg"
        autoCapitalize="none"
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
        }}
      />
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200 }}
          contentFit="contain"
        />
      ) : null}
    </View>
  );
}
