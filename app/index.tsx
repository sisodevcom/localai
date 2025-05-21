import TextRecognition from "@react-native-ml-kit/text-recognition";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";

export default function Index() {
  const [imageUrl, setImageUrl] = useState("");
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleRecognize = async () => {
    if (!imageUrl) return;
    setProcessing(true);
    try {
      const fileUri = `${FileSystem.cacheDirectory}ocr.jpg`;
      await FileSystem.downloadAsync(imageUrl, fileUri);
      // react-native-ml-kit returns an array of blocks
      const result = await TextRecognition.recognize(fileUri);
      if (Array.isArray(result)) {
        setRecognizedText(result.map((b: any) => b.text).join("\n"));
      } else if ((result as any).text) {
        setRecognizedText((result as any).text);
      } else {
        setRecognizedText(JSON.stringify(result));
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
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
        <>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200, marginBottom: 16 }}
            contentFit="contain"
          />
          <Button
            title={processing ? "Processing..." : "Start Text Recognition"}
            onPress={handleRecognize}
            disabled={processing}
          />
        </>
      ) : null}
      {recognizedText ? (
        <View style={{ marginTop: 16, width: "100%" }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Recognized Text:
          </Text>
          <Text>{recognizedText}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
