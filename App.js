import React,{ useRef} from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import BottomSheet from 'react-native-simple-bottom-sheet';

export default App = () => {
  const panelRef = useRef(false);
  const askForPermision = async () => {
    const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
    if (permissionResult.status !== "granted") {
      Alert.alert("No permissions to access Camera1", [{ text: "OK" }]);
      return false;
    }
    return true;
  };

  takeImage = async () => {
    const hasPermission = await ImagePicker.getCameraPermissionsAsync()
    if (!hasPermission) {
      return;
    } else {
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //specify file format
        allowsEditing: true, //image can be cropped after capture
        aspect: [3, 3], //defines image quality, low quality eq smaller file
        quality: 1,
        base64: true, //convert image into string to send via HTTP requests
      });

      if (!image.cancelled) {
        fetch("http://192.168.2.11:8080/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imgsource: image.base64,
          }),
        });
      }
    }
  };
  uploadImage = async () => {
    const hasPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!hasPermission) {
      return;
    } else {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, //specify file format
        allowsEditing: true, //image can be cropped after capture
        aspect: [3, 3], //defines image quality, low quality eq smaller file
        quality: 1,
        base64: true, //convert image into string to send via HTTP requests
      });

      if (!image.cancelled) {
        fetch("http://192.168.2.11:8080/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imgsource: image.base64,
          }),
        });
      }
    }
  };
  return (
    <View style={styles.container}>
        <Text>Profile picture</Text>
        <Text>Upload your photo so that you can optionally display it to others</Text>
        {/* camera svg */}

        <Button title= "Add a Photo" onPress = {() => panelRef.current.togglePanel()}/>
        <Button title= "Skip" />
        <BottomSheet ref={panelRef}>
        <Button title="Take a Photo" onPress={takeImage} />
        <Button title="Choose a picture ..." onPress={uploadImage} />
        </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

