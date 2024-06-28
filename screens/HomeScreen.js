import React, { useState, useCallback } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, TextInput, View, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { picts, routx } from "../utilitis";


export default function DashBoard({ navigation }) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderro, setLoadderro] = useState(false);
  const [loged, setLoged] = useState(false);
  //npx expo install expo-splash-screen expo-system-ui react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg

  useFocusEffect(
    useCallback(() => {
      const checkAndFetchData = async () => {
        axios.get(`${routx.Baseurl}`)
          .then((response) => {
            setData(response.data);
            setLoading(false);
            setLoadderro(false)
            expirationService()
          })
          .catch((error) => {
            setLoadderro(true)
            setLoading(false);
            console.error(error);
          });
      };
      checkAndFetchData();
    }, [])
  );


  const expirationService = async () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const yeahpe = await SecureStore.getItemAsync('aboucars');
    if (yeahpe) {
      const yeahpermi = yeahpe.split("-");
      if (currentMonth <= parseInt(yeahpermi[0]) && yeahpermi[1] === "2024") {
        setLoged(true)
      } else {
        setLoged(false)
      }
    } else {
      setLoged(false)
    }

  };


  const Reloader = () => {
    setLoadderro(false);
    setLoading(true);
    setData([]);

    axios.get(`${routx.Baseurl}`).then((response) => {
      setData(response.data);
      setLoading(false);

    }).catch((error) => {
      setLoadderro(true);
      setLoading(false);
    });

  }

  async function Copy_Rigth() {
    try {
      const yeahpermi = await SecureStore.getItemAsync('aboucars');
      if (!yeahpermi) {
        await SecureStore.setItemAsync('aboucars', '8-2024');
        setLoged(true)
      } else {
        setLoged(true)
      }
    } catch (error) {
      console.log('Error saving data:', error);
      setLoged(false)
    }
  };




  return (
    <View style={styles.container}>
      {loged ?
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
            style={"light"}
          />
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={["#000", "orange"]}
              start={{ x: 0.3, y: 0.8 }}
              end={{ x: 1.2, y: 0.8 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <Text style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: "orange",
                  fontStyle: "italic"
                }}>Abou</Text>
                <Text style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#aaa",
                  fontStyle: "italic"
                }}>Voiture</Text>
              </View>
              <TouchableOpacity style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }} onPress={() => Copy_Rigth()}>
                <Text style={{ fontStyle: "italic", color: "#aaa" }}>Adminitration</Text>
                <Ionicons name="chevron-forward-circle-outline" size={15} color={"#eee"} style={styles.searchIcon} />
              </TouchableOpacity>

            </LinearGradient>
          </View>

          <View style={styles.headerContainerReoc}>

          </View>


          <View style={{ height: 20 }} />

          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>

            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.spacing} />

              {data.length < 1 && (
                <TouchableOpacity style={styles.emptyContainer} onPress={() => Reloader()}>
                  <View style={styles.emptyOverlay} />
                  {loading ? (
                    <ActivityIndicator visible={loading} color="#000" size={"large"} />
                  ) : (
                    <Ionicons name="refresh-outline" size={50} color={loaderro ? "red" : "#000"} />
                  )}
                  {loaderro && <Text style={styles.errorText}>Échec de chargement</Text>}
                  {!loading && !loaderro && <Text style={styles.emptyText}>Vide (actualiser)</Text>}
                </TouchableOpacity>
              )}



              {data.length > 0 && data.map((car, index) => (
                <View key={car.id} style={styles.appointmentCard}>
                  <TouchableOpacity
                    style={styles.appointmentButton}
                    onPress={() => navigation.navigate("Détails", { car: car })}
                  >
                    <View style={styles.appointmentHeader}>
                      <Text style={{ color: "#aaa" }}>{index + 1}</Text>
                      <Text style={styles.appointmentPhoneText}>{car.created}</Text>
                    </View>

                    <View style={styles.spacingHorizontal} />

                    <View style={styles.appointmentDetails}>
                      <Image source={{ uri: car.image[0].ima }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 2, marginRight: 5 }} />
                      <Image source={{ uri: car.image[1].ima }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 2, marginRight: 5 }} />
                      <Image source={{ uri: car.image[2].ima }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 2, marginRight: 5 }} />
                      <Image source={{ uri: car.image[3].ima }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 2, marginRight: 5 }} />
                      <Image source={{ uri: car.image[4].ima }} resizeMode="contain" style={{ height: 50, width: 50, borderRadius: 2, marginRight: 5 }} />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              {data.length > 0 && (
                <TouchableOpacity style={styles.emptyContainer}>
                  <View style={styles.emptyOverlay} />
                  <Ionicons name="car-sport-outline" size={50} color="#000" />
                  <Text style={styles.emptyText}>{data.length} (Voiture{data.length > 1 ? "s" : ""})</Text>
                </TouchableOpacity>
              )}
              <View style={{ height: 150 }} />
            </ScrollView>
          </View>


          <TouchableOpacity style={
            {
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 1,
              shadowColor: '#ccc',
              elevation: 5,
              borderRadius: 15,
              position: "absolute",
              backgroundColor: "transparent",
              zIndex: 20,
              bottom: 20,
              right: 15,
            }
          }
            onPress={() => navigation.navigate("Enrôllement")}
          >

            <LinearGradient
              style={
                {
                  padding: 8,
                  borderRadius: 15,

                }
              }
              colors={["#6fcaea", "#99e6ae"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.5, y: 1 }}
            >

              <MaterialCommunityIcons name="note-edit" size={25} style={{ color: '#333' }} />
            </LinearGradient>
          </TouchableOpacity>
        </>
        :
        <View style={
          {
            height: "100%",
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee"

          }
        }>

          <TouchableOpacity delayLongPress={7000} onLongPress={() => Copy_Rigth()} style={
            {
              height: "20%",
              width: "90%",
              overflow: "hidden",
            }
          }>
            <Image source={picts.abou} resizeMode="contain" style={styles.logo} />
          </TouchableOpacity>
          <ActivityIndicator visible={loading} color="#fff" size={"large"} />

        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  headerContainer: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  headerGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainerReoc: {
    height: 50,
    width: "100%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowColor: 'orange',
    backgroundColor: "orange",
    zIndex: -1,
    marginTop: -52
  },

  headerContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logoButton: {
    height: 35,
    width: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
  },

  headerDecoration: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 48,
    zIndex: 0,
  },
  decoraImage: {
    width: "100%",
    height: "100%",
    tintColor: "#D51A65",
  },
  overlayDecoration: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 48,
    zIndex: -1,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: "3%",
  },
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: "100%",
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowColor: '#ccc',
  },
  searchIcon: {
    alignSelf: 'center',
    zIndex: 3,
    paddingLeft: 5,
  },
  searchInput: {
    paddingLeft: 12,
    backgroundColor: 'transparent',
    borderRadius: 10,
    fontSize: 17,
    height: 30,
    width: "77%",
    color: '#009de0',
  },
  scrollView: {
    height: Dimensions.get("window").height * 0.7,
    backgroundColor: "transparent",
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: "4%",
  },
  appointmentListTitle: {
    fontSize: 20,
    color: "#333",
  },
  spacing: {
    height: 10,
  },
  emptyContainer: {
    height: 200,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  emptyOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#99e6ae",
    opacity: 0.6,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#ff0000',
    alignSelf: "center",
    fontWeight: "400",
  },
  emptyText: {
    fontSize: 20,
    color: '#000',
    fontWeight: "400",
    alignSelf: "center",
  },
  appointmentCard: {
    borderRadius: 12,
    elevation: 3,
    width: "97%",
    padding: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  appointmentButton: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  appointmentHeader: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  spacingHorizontal: {
    width: '100%',
    height: 2,
    backgroundColor: "#eee",
    marginVertical: 5
  },
  appointmentTypeText: {
    fontSize: 15,
    color: "#009de0",
  },
  appointmentPhoneText: {
    fontSize: 15,
    color: "#aaaaaa",
    fontWeight: "bold",
  },
  appointmentDetails: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    overflow: "hidden"
  },
  appointmentDetailsText: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "400",
  },
});
