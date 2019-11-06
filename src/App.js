import React, { Component } from 'react';
import { Text, TextInput, View, Button,Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class HelloWorldApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            photo: null,
            avatarSource:null
        };
      }


      _onPressButton = () =>{
        alert(this.state.text);
      }

      handleChoosePhoto = () => {
        const options = {
          title:'my pic app',
          takePhotoButtonTitle:'Take photo',
          chooseFromLibraryButtonTitle:'choose photo from lib',
          //noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            this.setState({ photo: response });
          }
        });
      };



      handleUploadPhoto = () => {
        alert("in");

        const createFormData = (photo, body) => {
          const data = new FormData();
        
          data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri:
              Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
          });
        
          Object.keys(body).forEach(key => {
            data.append(key, body[key]);
          });
        
          return data;
        };
        fetch('http://192.168.11.138:3000/api/custom', { 
          method: 'POST',
           headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
           body: JSON.stringify({
            "Name":"trialil4",
            "MobileNo": 9695959195,
            "Address":"Tirupr"
            }) 
        })
        .then(response => {
          console.log(" succes");
        })
        .catch(error => {
          console.log("upload error", error);
          alert("Upload failed!");
        });


        fetch("http://192.168.11.138:3000/api/upload", {
          method: "POST",
          body: createFormData(this.state.photo, { userId: "123" })
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");
            this.setState({ photo: null });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
      };

      myfun=()=>{
        const options = {
          title:'my pic app',
          takePhotoButtonTitle:'Take photo',
          chooseFromLibraryButtonTitle:'choose photo from lib',
          //noData: true,
        };
        ImagePicker.showImagePicker(options, response => {
          console.log(" Response = ", response);
          if(response.didCancel){
            console.log("User Cancelled");
          }
          else if(response.error){
            console.log("error",response.error);
          }
          else if(response.customButton){
            console.log("Custom Button",response.customButton);
          }
          else{
            let source = { uri: response.uri };

            this.setState({
              avatarSource: source
            })
          }
        });
      }


  render() {
    const { photo } = this.state;

    

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
            <React.Fragment>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title="Upload" onPress={this.handleUploadPhoto} />
             </React.Fragment>
            )}
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        </View>
        <Text>Hello, world!</Text>
        <TouchableOpacity style={{backgroundColor:'green', margin:10, padding:10}} onPress={this.myfun}>
          <Text> Select image</Text>
        </TouchableOpacity>
        <View style={{padding: 10}}>
            <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });