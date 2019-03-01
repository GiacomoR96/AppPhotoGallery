import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class App extends Component {
  state = {
    image : null,
    error: '',
  }
  
  checkPhotoGalleryPermissions = async () => {
    console.log('I am here');
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(status);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };
  
  checkCameraPermissions = async () => {
    console.log('I am here');
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    if (status !== 'granted') {
      alert('Hey! You need to authorize my app ');
    }
  };
  
  
  render() {
    let { image } = this.state;
    
    return (
      <View style={styles.container}>
          
          
          {image && <Image source={{ uri: image}} style={{ width: 200, height: 200 }} />}
          <Button
          title="Scegli dalla fotocamera"
          onPress={this._pickImage}
          />

          <Button
          title="Scatta una foto"
          onPress={this._pickImageFromCamera}
          />

      </View>
    );
  }

  _pickImageFromCamera = async () => {
    await this.checkCameraPermissions();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _pickImage = async () => {
    await this.checkPhotoGalleryPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };





}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCamera:{
    width: 200,
    height: 200
  }
});
