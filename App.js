import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';

import {
  SafeAreaView
} from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Canvas, { Image as CanvasImage, Path2D, ImageData } from 'react-native-canvas';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { GLView } from "expo-gl";


let imagebase64 = ''

let width = 0
let height = 0

getcolor = async (srcbase64, height, width) => {


}

export default function App() {

  let options = {

    scalelist: ['1  or One to One', '0.5 or One to Two', '0.25 or one to Four', '0.125 or one to eight'],

    backroundcolorlist: ['White', 'Black', 'Red', 'Blue', 'yellow', 'green'],

    colorlist: ['White', 'Black'],

    fontsizelist: [' 8 Pixels ', ' 16 Pixels '],

    fontsizeint: [8, 16],

    scaleint: [1, 0.5, 0.25, 0.125],

    symbols: ['basic', 'Extendet']


  }

  let settings = {

    type: 'image',

    scale: 0.25,

    col: 100,

    backroundcolor: 'white',

    color: 'black',

    fontsize: 8,

    levels: 0

  }


  const [image, setimage] = useState(null);

  const [type, settype] = useState(null);


  return (

    <SafeAreaView>

      <LinearGradient
        // Button Linear Gradient
        colors={['#666', '#333', '#222', '#222', '#222', '#222', '#333', '#666']}
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 1,
          y: 1
        }} style={styles.boxm}>
        <View style={styles.headercontainer}>

          <Text style={styles.headertext} >PHOTO#HASH</Text>

        </View>
        <View>

          <ImagePickerexa image={image} setimage={setimage} />

        </View>

        <View style={styles.Sle}>

          <Selecter name="output type" items={['image', 'text']} selecter={(selectedItem, index) => {
            settype(selectedItem)
            settings.type = selectedItem
            console.log(selectedItem, index)
          }} />

        </View>

        < Options options={options} settings={settings} type={type} />

      </LinearGradient>
    </SafeAreaView>

  );
}

function ImagePickerexa(props) {

  const handleGl = async (gl) => {
    console.log(' hi fun')

    const image = new CanvasImage(canvas);

    canvas.width = width;
    canvas.height = height;


    console.log(' hi fun 5')


    const context = canvas.getContext('2d');



    image.addEventListener('load', () => {
      context.drawImage(image, 0, 0, width, height);
      console.log(' hi draw')

      context.getImageData(0, 0, width, height).then(imageData => {
        const data = Object.values(imageData.data);

        console.log(data)

      });
    });

    image.src = 'data:image/jpeg;base64,' + imagebase64.slice(4)
  }


  const pickImage = async () => {

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });

    console.log(result.uri);


    if (!result.cancelled) {
      props.setimage(result)
      imagebase64 = result.base64
      width = result.width
      height = result.height

      //let index = { uri: result.uri }
      let bef = 'data:image/jpeg;base64,'
    }
  }

  if (props.image) {

    return (
      <View style={styles.imagepicker}>
        <GLView ref={handleGl} style={styles.imagepicker} />

        <Pressable style={styles.imagepickerPressablechange} onPress={pickImage} >

          <Text style={styles.imagepickerPressabletextchange}> CHANGE </Text>

        </Pressable>
      </ View>);
  }

  else {
    return (
      <View style={styles.imagepicker}>
        <Text style={styles.imagepickerbuttontext}> Pick an image </Text>
        <Pressable style={styles.imagepickerbutton} onPress={pickImage} >
          <Text style={styles.imagepickerPressabletext}> + </Text>
        </Pressable>
      </View>
    );
  }

}


function Selecter(props) {

  let data = props.items;

  return (
    <View>
      <SelectDropdown

        buttonStyle={styles.dropdown}

        buttonTextStyle={styles.text}

        defaultButtonText={props.name}

        rowStyle={styles.row}

        rowTextStyle={styles.textdrop}

        data={data}

        onSelect={props.selecter}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
    </ View>)

}

function Options(props) {

  const [number, onChangeNumber] = React.useState(null);

  if (props.type === null) {
    return (
      <View style={styles.opbox}>

      </View>
    );
  } else if (props.type === 'image') {

    return (
      <View style={styles.opbox}>
        <Selecter name="compression Scale" items={props.options.scalelist} selecter={(selectedItem, index) => {
          props.settings.scale = props.options.scaleint[index];
        }}
        />

        <Selecter name="Backround color" items={props.options.backroundcolorlist} selecter={(selectedItem, index) => {
          props.settings.backroundcolor = props.options.backroundcolorlist[index].toLowerCase();
        }} />

        <Selecter name="Text color" items={props.options.colorlist} selecter={(selectedItem, index) => {
          props.settings.color = props.options.colorlist[index].toLowerCase();
        }} />

        <Selecter name="Font Size" items={props.options.fontsizelist} selecter={(selectedItem, index) => {
          props.settings.fontsize = props.options.fontsizeint[index]
        }} />

        <Selecter name="Symbols   " items={props.options.symbols} selecter={(selectedItem, index) => {
          props.settings.levels = index
        }} />

      </ View>);
  } else if (props.type === 'text') {
    return (
      <View style={styles.opbox}>

        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="col or chars per line"
          keyboardType="numeric"
        />

        <Selecter name="Symbols   " items={props.options.symbols} selecter={(selectedItem, index) => {
          props.settings.levels = index
        }} />

      </View>);

  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  boxm: {
    height: 1000,
    width: 'auto'
  },

  box: {
    height: 430,
    width: 'auto',
  },


  // Header styles___________________________________________________
  headercontainer: {
    height: 70,
    width: 'auto',
    color: '#ffffff',
    backgroundColor: '#222222',
    borderRadius: 15,
    marginTop: 10,
    opacity: 0.7,
    margin: 2,
    justifyContent: 'center'
  },
  headertext: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: '700',
    marginLeft: 20,
    color: '#eeeeee'
  },//_______________________________________________________________


  // Image Picker Styles___________________________________________
  imagepicker: {
    width: 'auto',
    height: 100,
    alignItems: 'center',
    marginTop: 5
  },
  imagepickerbutton: {
    borderRadius: 50,
    marginTop: 15,
    backgroundColor: '#222222',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#eeeeee',
    opacity: 0.7
  },
  imagepickerbuttontext: {
    marginTop: 15,
    color: '#aaa'
  },
  imagepickerimage: {
    width: 200,
    height: 200,
    opacity: 0.6
  },
  imagepickerPressabletext: {
    fontSize: 30,
    lineHeight: 25,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  imagepickerPressablechange: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#222222',
    color: '#eeeeee',
    opacity: 0.7
  },
  imagepickerPressabletextchange: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#eeeeee',

  },//_______________________________________________________________


  // Sleacters styles ____________________________________________
  dorpdowntext: {
    fontSize: 16,
    letterSpacing: 2,
    color: 'black'

  },
  dropdown: {
    backgroundColor: '#222222',
    color: '#eee',
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 10,
    marginLeft: 15,
    opacity: 0.7
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#222222',
    fontSize: 16,
    padding: 1,
    opacity: 1
  },
  text: {
    flex: 1,
    color: '#eee',
    fontSize: 16,
    letterSpacing: 1
  },
  textdrop: {
    fontWeight: 'bold',
    color: '#eee',
    fontSize: 16,
    letterSpacing: 1
  },
  Sle: {
    marginTop: 170,
  },
  //_______________________________________________________________

  hr:
  {
    height: 1,
    width: 'auto',
    backgroundColor: '#333'
  },
  opbox: {
    height: 550,
    width: 'auto',
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#222222',
    color: '#eee',
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 5,
    borderRadius: 15,
    margin: 5,
    opacity: 0.7
  },


})







