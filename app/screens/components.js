import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native';
import { ImagePickerexa } from './filepicker';
import { Selecter } from './selecter';
import { ascii_img } from '../functions/asckiitoimg'

let levels = 0;

const scalelist = ['1  or One to One', '0.5 or One to Two', '0.25 or one to Four', '0.125 or one to eight'];


const scaleint = [1, 0.5, 0.25, 0.125];


let scale = 0.25;

const backroundcolorlist = ['White', 'Black', 'Red', 'Blue', 'yellow', 'green'];


let backroundcolor = 'white';


const colorlist = ['White', 'Black'];


let color = 'black';


const fontsizelist = [' 8 Pixels ', ' 16 Pixels ', ' 32 Pixels ', ' 64 Pixels '];


const fontsizeint = [8, 16, 32, 64];


let fontsize = 8;




export function Header(props) {


  return (
    <View style={styles.headercontainer}>

      <Image style={styles.headertext} source={require('./Hash.svg')} />

      <Text style={styles.headertext} >Hash$To$ASCII</Text>

      <Pressable style={styles.headrinfo} onPress={props.pageindex} >


        <Text style={styles.headrinfotext}> Info </Text>

      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

export function Body(props) {


  let [image, setImage] = useState(null);



  if (props.page === 'home') {

    return (
      <View style={styles.Bodycontainer}>

        <ImageBackground source={require('../assets/Hashed.png')} resizeMode="cover" style={styles.image}>

          <ImagePickerexa image={image} setImage={setImage} />

          <View style={{ flex: 2, flexDirection: 'row', flexWrap: 'wrap' }}>

            <Selecter name="compression Scale" items={scalelist} selecter={(selectedItem, index) => {
              scale = scaleint[index];
              console.log(scale);
            }}
            />

            <Selecter name="Backround color" items={backroundcolorlist} selecter={(selectedItem, index) => {
              backroundcolor = backroundcolorlist[index].toLowerCase();
              console.log(backroundcolor);
            }} />

            <Selecter name="Text color" items={colorlist} selecter={(selectedItem, index) => {
              color = colorlist[index].toLowerCase();
            }} />


            <Selecter name="Font Size" items={fontsizelist} selecter={(selectedItem, index) => {
              fontsize = fontsizeint[index]
            }} />

            <Selecter name="Symbols   " items={['basic', 'Extendet']} selecter={(selectedItem, index) => {
              levels = index
            }} />


          </View>

          <View style={{ flex: 3 }}>

            <View style={{ flex: 5, }}>

            </View>

            <View style={{ flex: 2, }}>
              <Pressable style={styles.convert} onPress={async () => {

                let out = `asckii_art_${scale}_${color}`;


                if (image) {

                  console.log('hi')

                  let result = await ascii_img(scale, image, backroundcolor, out, levels, fontsize, color);



                }

              }} >

                <Text style={styles.converttext}> Convert Image </Text>

              </Pressable>
            </View>


          </View>


        </ImageBackground>

      </View>
    );

  } else if (props.page === 'info') {
    return (
      <View style={styles.info}>


        <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lorem elit, efficitur vitae tellus dictum, egestas accumsan felis. Praesent augue ipsum, facilisis et est sit amet, commodo lobortis ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit urna faucibus rhoncus auctor. Nulla facilisi. Integer volutpat viverra lorem, nec fringilla quam dignissim id. Phasellus lorem elit, gravida ac massa ac, posuere tristique magna. Sed vitae mollis augue.

          Etiam viverra pellentesque sodales. Morbi tristique quis nisl a iaculis. Etiam eu maximus mi. Nam aliquam nisl quis ornare suscipit. Phasellus venenatis purus a magna consectetur, eu porta nibh cursus. Praesent vitae maximus nisl. Etiam sed neque in lacus hendrerit euismod et non dui. In convallis pellentesque nulla, eget interdum ligula mollis at. Donec sollicitudin nulla nec nibh finibus, non consectetur erat elementum. Quisque id consectetur orci, ut ultrices lectus. Donec varius ligula turpis, aliquet lacinia felis scelerisque id. Morbi faucibus feugiat mattis. Pellentesque eu viverra diam, nec laoreet magna. Sed maximus, ante a congue lacinia, lorem urna consectetur lacus, ut viverra ante metus quis nisl.

          Phasellus pretium neque justo, id mattis lacus bibendum ac. Cras aliquet leo odio. Ut ut est sed mauris maximus luctus. Phasellus vel tempus nunc. Sed interdum mi vitae tristique blandit. Pellentesque rhoncus nisi vel ex euismod maximus. Curabitur volutpat nisl in eros blandit tristique. Vivamus pellentesque orci a fermentum imperdiet. Vivamus metus augue, interdum ornare risus vitae, pellentesque accumsan mi. Integer interdum nisl sed sem luctus, eget auctor justo mollis. Aenean ut bibendum magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sollicitudin arcu sed efficitur dictum. Vestibulum in dolor nisl. Nunc vitae condimentum risus, id sagittis tellus. Vivamus purus risus, pretium sed venenatis quis, lacinia a odio.

          Nullam dui ipsum, porta vel aliquet at, lacinia posuere elit. Nullam eget venenatis augue. Praesent eu vulputate sem. Phasellus efficitur erat ligula, at consectetur enim mollis vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed dolor metus, viverra nec pulvinar at, suscipit et eros. Suspendisse volutpat ante ac ipsum euismod, ut posuere massa molestie. Integer porta dapibus euismod. Morbi pulvinar massa leo. Nullam pretium massa ac justo aliquam dictum. Fusce in sapien et odio ornare convallis sed ut mauris. Nam quis lorem eu nisl gravida feugiat.

          Suspendisse potenti. Suspendisse congue, dolor non sagittis consectetur, metus magna egestas est, non pharetra libero diam vitae ante. Phasellus mollis et ex non maximus. Integer accumsan felis et turpis volutpat dignissim. Curabitur consectetur odio non tellus aliquet, et volutpat quam dapibus. Sed et lacinia justo. Sed sed mauris nec orci sodales ullamcorper. Cras vehicula ultrices mattis. Aliquam consequat, elit et sagittis aliquam, sapien eros egestas turpis, at consectetur nunc magna id est. Etiam ut volutpat tortor. Curabitur vel sem tortor. Duis vitae turpis interdum, pulvinar massa vel, cursus eros.
        </Text>
      </View>
    );
  }

}




const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain'
  },

  headercontainer: {

    borderRadius: '5px',
    width: '100%',
    minHeight: '70px',
    maxHeight: '5%',
    flex: 1,
    backgroundColor: '#969796',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  headertext: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: 'black',
    marginLeft: '5px',
    fontSize: '25px',
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: '3px',
    marginTop: '15px'

  },

  Bodycontainer: {
    borderRadius: '10px',
    width: '100%',
    height: 'auto',
    flex: 1,
    justifyContent: 'center',

  },
  headrinfo: {
    backgroundColor: '#222222',
    borderWidth: '1px',
    borderColor: '#222222',
    marginLeft: 'auto',
    borderRadius: '5px',
    padding: '5px'

  },
  headrinfotext: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: '16px',
    letterSpacing: '3px',
    marginTop: '15px',
    fontWeight: 'bold'
  },
  info: {
    backroundcolor: '#fff',
    color: '#000',
    fontSize: '26',
    margin: '5%'
  },
  convert: {
    width: '94%',
    borderRadius: '5%',
    marginTop: '2%',
    alignItems: 'center',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    padding: '5%',
    elevation: 3,
    borderWidth: '2px',
    borderColor: '#222222',
    margin: '3%',
  },
  converttext: {
    fontSize: 30,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#222222',

  }
});


