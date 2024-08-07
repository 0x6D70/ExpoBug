import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Camera, CameraView } from 'expo-camera';

export default function App() {
  let camera = useRef(null)
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    console.log('taking picture ...')

    const picture = await camera.current.takePictureAsync({
      exif: true,
      base64: true,
      skipProcessing: false,
    })

    console.log(`height: ${picture.height}, width: ${picture.width}`)
  }

  return (
    <CameraView
      ref={camera}
      style={{ width: "100%", height: "100%" }}
      ratio='16:9'
      onCameraReady={console.log}
      onMountError={console.warn}
    >
      <TouchableOpacity
        style={{
          position: 'relative',
          width: 120,
          height: 120,
          backgroundColor: 'white',
          margin: 'auto'
        }}
        onPress={takePicture}
      >
        <Text>take picture</Text>
      </TouchableOpacity>
    </CameraView>
  );
}
