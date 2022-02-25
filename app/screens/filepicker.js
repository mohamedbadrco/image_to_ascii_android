import React, { useState, useEffect } from 'react';

import { StyleSheet, Button, Image, View, Platform, Pressable, Text } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export function ImagePickerexa(props) {
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      props.setImage(result.uri);

      styles.imagepickerbutton = {};
      styles.imagepickerbuttontext = {};

    }
  };

  if (props.image) {
    return (
      <View style={styles.imagepicker}>
        {props.image && <Image source={{ uri: props.image }} style={styles.imagepickerimage} />}

        <Pressable style={styles.imagepickerPressablechange} onPress={pickImage} >

          <Text style={styles.imagepickerPressabletext}> Change </Text>

        </Pressable>

      </ View>

    )

  }
  return (
    <View style={styles.imagepicker}>
      <Text style={styles.imagepickerbuttontext}> Pick an image </Text>
      <Pressable style={styles.imagepickerbutton} onPress={pickImage} >
        <Text style={styles.imagepickerPressabletext}> + </Text>
      </Pressable>



    </View>
  );

}

let styles = StyleSheet.create({

  imagepicker: {
    width: '100%',
    height: '300px',
    flex: 3,
    alignItems: 'center',
    marginTop: '5%'

  },
  imagepickerbutton: {
    borderRadius: '50%',
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#231F20',
    paddingVertical: '30px',
    paddingHorizontal: '25px',
    borderWidth:'2px',
    borderColor: '#fff'


  },
  imagepickerbuttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  imagepickerimage: {
    width: 200,
    height: 200,
    opacity: '0.5'
  },
  imagepickerPressabletext: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',

  },
  imagepickerPressablechange: {

    borderRadius: '5%',
    marginTop: '2%',
    alignItems: 'center',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    padding: ' 15px',
    elevation: 3,
    backgroundColor: '#969796'

  }

})