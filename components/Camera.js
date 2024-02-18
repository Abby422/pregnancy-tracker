import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@mdi/react";
import { mdiOrbitVariant } from "@mdi/js";
import * as ImagePicker from "expo-image-picker";

export default function CamApp() {
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermissions, setHasGalleryPermission] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      hasGalleryPermissions(galleryStatus.status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    // Camera permissions are still loading
    return <View />;
  }

  if (hasPermission === false || galleryPermissions) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync(null);
      setImage(photo.uri);
    }
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio="1:1"
        ref={(ref) => setCamera(ref)}
      />
      <Button
        style={styles.button}
        onPress={toggleCameraType}
        title="Flip Camera"
      ></Button>
      <Button
        style={styles.button}
        onPress={takePicture}
        title="Take Picture"
      ></Button>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
