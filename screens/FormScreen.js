import React, { useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Ionicons, MaterialCommunityIcons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const FormScreen = ({ navigation }) => {

  const [imga, Imga] = useState();
  const [imgb, Imgb] = useState();
  const [imgc, Imgc] = useState();
  const [imgd, Imgd] = useState();
  const [imge, Imge] = useState();

  const [imgading, setImgading] = useState(false);
  const [imgbding, setImgbding] = useState(false);
  const [imgcding, setImgcding] = useState(false);
  const [imgdding, setImgdding] = useState(false);
  const [imgeding, setImgeding] = useState(false);

  const [iaerro, setIaerro] = useState(false);
  const [iberro, setIberro] = useState(false);
  const [icerro, setIcerro] = useState(false);
  const [iderro, setIderro] = useState(false);
  const [ieerro, setIeerro] = useState(false);



  const [sending, setSending] = useState(false);
  const [added, setAdded] = useState(false);
  const [senderro, setSenderro] = useState(false);


  useFocusEffect(
    useCallback(() => {
      Imga();
      Imgb();
      Imgc();
      Imgd();
      Imge();
      setImgading(false);
      setImgbding(false);
      setImgcding(false);
      setImgdding(false);
      setImgeding(false);
      setIaerro(false);
      setIberro(false);
      setIcerro(false);
      setIderro(false);
      setIeerro(false);
      setSending(false);
      setAdded(false);
      setSenderro(false);


    }, [])
  );


  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }



  const sendImage = async (imageData, imageName, who) => {
    let old_imaga;
    setIaerro(false);
    setIberro(false);
    setIcerro(false);
    setIderro(false);
    setIeerro(false);
    switch (who) {
      case "imga":
        old_imaga = imga;
        setImgading(true);
        break;

      case "imgb":
        old_imaga = imgb;
        setImgbding(true);
        break;

      case "imgc":
        old_imaga = imgc;
        setImgcding(true);
        break;

      case "imgd":
        old_imaga = imgd;
        setImgdding(true);
        break;

      case "imge":
        old_imaga = imge;
        setImgeding(true);
        break;

      default:
        console.log("none")
        break;
    }

    const ImageDatas = {
      ima: imageData,
      nam: imageName,
      old_image: old_imaga ? old_imaga : null
    }


    //const truncatedString = truncateString(ImageDatas.ima, 130);

    //console.log(truncatedString);
    try {
      const response = await axios.post(`${routx.tunal}boutique/uploadImage`, ImageDatas);

      const imageUrl = response.data.ima;

      switch (who) {
        case "imga":
          Imga(imageUrl);
          setImgading(false);
          break;

        case "imgb":
          Imgb(imageUrl);
          setImgbding(false);
          break;

        case "imgc":
          Imgc(imageUrl);
          setImgcding(false);
          break;

        case "imgd":
          Imgd(imageUrl);
          setImgdding(false);
          break;

        default:
          Imge(imageUrl);
          setImgeding(false);
          break;
      }

    } catch (error) {
      console.error('Error uploading image:', error);
      switch (who) {
        case "imga":
          setImgading(false);
          setIaerro(true);
          break;

        case "imgb":
          setImgbding(false);
          setIberro(true);
          break;

        case "imgc":
          setImgcding(false);
          setIcerro(true);
          break;

        case "imgd":
          setImgdding(false);
          setIderro(true);
          break;

        default:
          setImgeding(false);
          setIeerro(true);
          break;
      }
    }
  };


  const pickImage = async (who) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
    });

    if (!result.canceled) {
      //console.log(result.assets[0].fileName);
      sendImage(result.assets[0].base64, result.assets[0].uri.split('/').pop(), who);
    }
  };



  const createItem = async () => {
    setSending(true);
    setSenderro(false)
    setAdded(false);

    const CARS = {
      image: [
        {
          ima: imga ? imga : "https://storage.googleapis.com/seeme-7a462.appspot.com/7f7aadaa-1cf5-4aca-892b-d1febe36f2357116B7DD-FBBE-44DD-931A-8611358198CE.jpg"
        },
        {
          ima: imgb ? imgb : "https://storage.googleapis.com/seeme-7a462.appspot.com/7f7aadaa-1cf5-4aca-892b-d1febe36f2357116B7DD-FBBE-44DD-931A-8611358198CE.jpg"
        },
        {
          ima: imgc ? imgc : "https://storage.googleapis.com/seeme-7a462.appspot.com/7f7aadaa-1cf5-4aca-892b-d1febe36f2357116B7DD-FBBE-44DD-931A-8611358198CE.jpg"
        },
        {
          ima: imgd ? imgd : "https://storage.googleapis.com/seeme-7a462.appspot.com/7f7aadaa-1cf5-4aca-892b-d1febe36f2357116B7DD-FBBE-44DD-931A-8611358198CE.jpg"
        },
        {
          ima: imge ? imge : "https://storage.googleapis.com/seeme-7a462.appspot.com/7f7aadaa-1cf5-4aca-892b-d1febe36f2357116B7DD-FBBE-44DD-931A-8611358198CE.jpg"
        }
      ],
    };

    axios.post(`${routx.Baseurl}`, CARS).then((ddd) => {
      setSending(false);
      setAdded(true);
      navigation.goBack()
    }).catch((error) => {
      console.log(error);
      setSending(false);
      setSenderro(true);
      console.log(error);
    });

  };



  return (


    <View style={hilai.container}>
      <StatusBar animated={true} style="dark" backgroundColor="transparent" />

      <TouchableOpacity style={{
        alignItems: 'center',
        height: 30,
        width: 45,
        justifyContent: "center",
        position: "absolute",
        marginHorizontal: 10,
        marginVertical: 30,
        zIndex: 9999,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 1,
        shadowColor: '#aaa',
      }} onPress={() => navigation.goBack()}>
        <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "#fff", opacity: 1, borderRadius: 10, elevation: 3 }}>

        </View>
        <MaterialCommunityIcons name="arrow-left" size={25} style={{ color: '#007fbb', elevation: 4 }} />

      </TouchableOpacity>

      {added &&
        <View style={
          {
            width: "50%",
            alignItems: 'center',
            justifyContent: "center",
            position: "absolute",
            marginHorizontal: 10,
            marginVertical: 40,
            zIndex: 9999,
            alignSelf: "center"

          }
        }>
          <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "green", opacity: 0.3, borderRadius: 10 }}>

          </View>
          <Text style={{ fontSize: 15, color: "green", fontWeight: "bold" }}>Article ajouté</Text>

        </View>
      }

      {senderro &&
        <View style={
          {
            width: "50%",
            alignItems: 'center',
            justifyContent: "center",
            position: "absolute",
            marginHorizontal: 10,
            marginVertical: 40,
            zIndex: 9999,
            alignSelf: "center"

          }
        }>
          <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "red", opacity: 0.3, borderRadius: 10 }}>

          </View>
          <Text style={{ fontSize: 15, color: "red", fontWeight: "bold" }}>Article non ajouté</Text>

        </View>
      }

      <View style={{ height: 70 }}></View>


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          paddingHorizontal: 27,

        }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          height: 850,
        }}>

          <View style={{ height: 10 }}></View>

          <View style={
            {
              alignItems: 'center',
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",

            }
          }>

            <LinearGradient
              style={
                {
                  width: "100%",
                  borderRadius: 10,
                  height: "100%",
                  overflow: "hidden"
                }
              }
              colors={["#bd177d", "#6fcaea"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 1.3 }}
            >
              {imga ?

                <View>

                  < TouchableOpacity
                    style={{
                      height: 45,
                      width: 45,
                      right: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      borderRadius: 7,
                      elevation: 8,
                      zIndex: 2

                    }}
                    onPress={() => pickImage("imga")}
                  >
                    <MaterialCommunityIcons name="image-edit-outline" size={40} style={{ color: "#fff" }} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imga }}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: 'center',
                    }}
                  />
                </View>
                :

                <>
                  {imgading ?

                    <TouchableOpacity>
                      <Image
                        source={picts.loadingc}
                        resizeMode="stretch"
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>

                    :

                    <>
                      {iaerro ?
                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imga")}>
                          < MaterialCommunityIcons name="refresh-circle" size={20} color={"#fff"} />
                          <Text style={{ fontSize: 15, color: "#fff" }}>Échèc de l'operation</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imga")}>
                          < MaterialCommunityIcons name="image-edit-outline" size={150} color={"#99e6ae"} />
                          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Selectionnez une photo</Text>
                        </TouchableOpacity>

                      }
                    </>
                  }
                </>
              }

            </LinearGradient>
          </View>

          <View style={{ height: 35 }}></View>

          {/** @@@@@@@@@@@@@@@@@@@@@@@@@@ image a ends here @@@@@@@@@@@@@@@@@@@ */}

          <View style={
            {
              alignItems: 'center',
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",

            }
          }>

            <LinearGradient
              style={
                {
                  width: "100%",
                  borderRadius: 10,
                  height: "100%",
                  overflow: "hidden"
                }
              }
              colors={["orange", "red"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 1.3 }}
            >
              {imgb ?

                <View>

                  < TouchableOpacity
                    style={{
                      height: 45,
                      width: 45,
                      right: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      borderRadius: 7,
                      elevation: 8,
                      zIndex: 2

                    }}
                    onPress={() => pickImage("imgb")}
                  >
                    <MaterialCommunityIcons name="image-edit-outline" size={40} style={{ color: "#fff" }} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imgb }}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: 'center',
                    }}
                  />
                </View>
                :

                <>
                  {imgbding ?

                    <TouchableOpacity>
                      <Image
                        source={picts.loadingc}
                        resizeMode="stretch"
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>

                    :

                    <>
                      {iberro ?
                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgb")}>
                          < MaterialCommunityIcons name="refresh-circle" size={20} color={"#fff"} />
                          <Text style={{ fontSize: 15, color: "#fff" }}>Échèc de l'operation</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgb")}>
                          < MaterialCommunityIcons name="image-edit-outline" size={150} color={"#99e6ae"} />
                          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Selectionnez une photo</Text>
                        </TouchableOpacity>

                      }
                    </>
                  }
                </>
              }

            </LinearGradient>
          </View>

          <View style={{ height: 35 }}></View>

          {/** @@@@@@@@@@@@@@@@@@@@@@@@@@ image b ends here @@@@@@@@@@@@@@@@@@@ */}

          <View style={
            {
              alignItems: 'center',
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",

            }
          }>

            <LinearGradient
              style={
                {
                  width: "100%",
                  borderRadius: 10,
                  height: "100%",
                  overflow: "hidden"
                }
              }
              colors={["#999abc", "orange"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 1.3 }}
            >
              {imgc ?

                <View>

                  < TouchableOpacity
                    style={{
                      height: 45,
                      width: 45,
                      right: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      borderRadius: 7,
                      elevation: 8,
                      zIndex: 2

                    }}
                    onPress={() => pickImage("imgc")}
                  >
                    <MaterialCommunityIcons name="image-edit-outline" size={40} style={{ color: "#fff" }} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imgc }}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: 'center',
                    }}
                  />
                </View>
                :

                <>
                  {imgcding ?

                    <TouchableOpacity>
                      <Image
                        source={picts.loadingc}
                        resizeMode="stretch"
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>

                    :

                    <>
                      {icerro ?
                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgc")}>
                          < MaterialCommunityIcons name="refresh-circle" size={20} color={"#fff"} />
                          <Text style={{ fontSize: 15, color: "#fff" }}>Échèc de l'operation</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgc")}>
                          < MaterialCommunityIcons name="image-edit-outline" size={150} color={"#99e6ae"} />
                          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Selectionnez une photo</Text>
                        </TouchableOpacity>

                      }
                    </>
                  }
                </>
              }

            </LinearGradient>
          </View>

          <View style={{ height: 35 }}></View>

          {/** @@@@@@@@@@@@@@@@@@@@@@@@@@ image c ends here @@@@@@@@@@@@@@@@@@@ */}

          <View style={
            {
              alignItems: 'center',
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",

            }
          }>

            <LinearGradient
              style={
                {
                  width: "100%",
                  borderRadius: 10,
                  height: "100%",
                  overflow: "hidden"
                }
              }
              colors={["#333333", "#007fbb"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 1.3 }}
            >
              {imgd ?

                <View>

                  < TouchableOpacity
                    style={{
                      height: 45,
                      width: 45,
                      right: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      borderRadius: 7,
                      elevation: 8,
                      zIndex: 2

                    }}
                    onPress={() => pickImage("imgd")}
                  >
                    <MaterialCommunityIcons name="image-edit-outline" size={40} style={{ color: "#fff" }} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imgd }}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: 'center',
                    }}
                  />
                </View>
                :

                <>
                  {imgdding ?

                    <TouchableOpacity>
                      <Image
                        source={picts.loadingc}
                        resizeMode="stretch"
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>

                    :

                    <>
                      {iderro ?
                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgd")}>
                          < MaterialCommunityIcons name="refresh-circle" size={20} color={"#fff"} />
                          <Text style={{ fontSize: 15, color: "#fff" }}>Échèc de l'operation</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imgd")}>
                          < MaterialCommunityIcons name="image-edit-outline" size={150} color={"#99e6ae"} />
                          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Selectionnez une photo</Text>
                        </TouchableOpacity>

                      }
                    </>
                  }
                </>
              }

            </LinearGradient>
          </View>


          <View style={{ height: 35 }}></View>

          {/** @@@@@@@@@@@@@@@@@@@@@@@@@@ image d ends here @@@@@@@@@@@@@@@@@@@ */}

          <View style={
            {
              alignItems: 'center',
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",

            }
          }>

            <LinearGradient
              style={
                {
                  width: "100%",
                  borderRadius: 10,
                  height: "100%",
                  overflow: "hidden"
                }
              }
              colors={["#d3c3aa", "#8c8ee7"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.5, y: 1.3 }}
            >
              {imge ?

                <View>

                  < TouchableOpacity
                    style={{
                      height: 45,
                      width: 45,
                      right: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      borderRadius: 7,
                      elevation: 8,
                      zIndex: 2

                    }}
                    onPress={() => pickImage("imge")}
                  >
                    <MaterialCommunityIcons name="image-edit-outline" size={40} style={{ color: "#fff" }} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imge }}
                    resizeMode="stretch"
                    style={{
                      width: "100%",
                      height: "100%",
                      alignSelf: 'center',
                    }}
                  />
                </View>
                :

                <>
                  {imgeding ?

                    <TouchableOpacity>
                      <Image
                        source={picts.loadingc}
                        resizeMode="stretch"
                        style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>

                    :

                    <>
                      {ieerro ?
                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imge")}>
                          < MaterialCommunityIcons name="refresh-circle" size={20} color={"#fff"} />
                          <Text style={{ fontSize: 15, color: "#fff" }}>Échèc de l'operation</Text>
                        </TouchableOpacity>

                        :

                        <TouchableOpacity style={{
                          width: "100%",
                          height: "100%",
                          alignSelf: 'center',
                          padding: 15
                        }} onPress={() => pickImage("imge")}>
                          < MaterialCommunityIcons name="image-edit-outline" size={150} color={"#99e6ae"} />
                          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>Selectionnez une photo</Text>
                        </TouchableOpacity>

                      }
                    </>
                  }
                </>
              }

            </LinearGradient>
          </View>

          {/** @@@@@@@@@@@@@@@@@@@@@@@@@@ image e ends here @@@@@@@@@@@@@@@@@@@ */}

          <View style={{ height: 35 }}></View>

          <View style={{
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: 10,
            width: '100%',
            alignItems: "center"

          }}>
            <LinearGradient
              style={
                {
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 1,
                  shadowColor: '#ccc',
                  elevation: 5,
                  borderRadius: 8,
                }
              }
              colors={["#6fcaea", "#99e6ae"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.5, y: 1 }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 18,
                  paddingVertical: 5

                }}
                onPress={() => createItem()}
              >
                {sending &&
                  <ActivityIndicator
                    visible={sending}
                    color="#000"
                  />
                }

                {!sending && !senderro &&
                  <Text style={{ fontSize: 18, color: "#000" }}>
                    Ajouter
                  </Text>
                }

                {senderro &&
                  <Ionicons name="refresh-outline" size={20} color={"#333"} />

                }
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ height: 300 }}></View>
        </ScrollView >
      </KeyboardAvoidingView>

    </View >

  )
}

const hilai = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: HEIGHT,
    overflow: 'scroll'
  },


  containerSc: {
    paddingHorizontal: "0%",
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "#FFF",
    paddingTop: 15,
    flex: 1,

  }
});


export default FormScreen;