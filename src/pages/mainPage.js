import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,TextInput, PermissionsAndroid, StatusBar, FlatList, Alert, AsyncStorage, Modal, KeyboardAvoidingView, ToastAndroid} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import GeoPosition from '@react-native-community/geolocation'
import GeoLocation from 'react-native-geolocation-service'
import * as Animatable from 'react-native-animatable'
import ShortCut from '../components/shortcutItem'

export default function mainPage({navigation}) {
  const [inputData, setInputData] = useState('')
  const [shortCuts, setShortCuts] = useState(getShortCuts)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCity, setModalCity] = useState('')
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)

  async function getShortCuts(){
    try {
      const retrievedShortcuts = await AsyncStorage.getItem('savedShortcuts')

      setShortCuts(JSON.parse(retrievedShortcuts) || [])
    } catch (error) {
      Alert.alert('Opps!!', 'Não foi possível carregar seus atalhos, por favor reinicie o aplicativo.')
    }
  }

  async function goToLocation(){
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    await GeoLocation.getCurrentPosition(
      position => {
        setLat(Number(position.coords.latitude))
        setLong(Number(position.coords.longitude))
      },
      () => GeoPosition.getCurrentPosition(
        backupPosition => {
          setLat(Number(backupPosition.coords.latitude))
          setLong(Number(backupPosition.coords.longitude))
        },
        () => {navigation.navigate('MainPage')},
        {timeout: 5000, enableHighAccuracy: true}
      ),
      {timeout: 5000, enableHighAccuracy: true}
    )
    
    if(granted){
      navigation.navigate('LocationPage', {latitude: lat, longitude: long})
    }
    else{
      alert('Precisa de permissao para essa funcao')
    }
  }



  function addShortCut(){
    if(shortCuts.length < 7){
      if(modalCity){
        let newShortCut = {
          cityName: modalCity,
          animation: 1000 + (shortCuts.length * 200),
          key: modalCity + Math.random().toString
        }

        shortCuts.unshift(newShortCut)

        saveShortcuts(shortCuts)

        setModalCity('')
        setModalOpen(false)
      }else{alert('escreva algo')}
    }else{
      Alert.alert('Limite de atalhos atingido', 'Você atingiu o limite de 7 atalhos, se quiser criar outro, delete um existente')
    }
  }

  function deleteShortCut(key){
    let newShortcuts = shortCuts.filter(item => item.key !== key)

    setShortCuts(newShortcuts)
    ToastAndroid.show('Atalho removido', ToastAndroid.SHORT)
    saveShortcuts(newShortcuts)
  }

  async function saveShortcuts(dataToSave){
    try {
      await AsyncStorage.setItem('savedShortcuts', JSON.stringify(dataToSave))
    } catch (error) {
      Alert.alert('Tente novamente', 'Ocorreu um problema ao salvar seu atalho, por favor tente novamente')
    }
  }

  

  return (
    <LinearGradient
      start={{x: 0.7, y: 0.2}}
      end={{x: 0.2, y: 0.9}}
      locations={[0.2, 0.4, 0.6, 0.8, 1]}
      colors={['#0066ff', '#3385ff', '#4d9aff', '#99c2ff', '#b3d1ff']}
      style={styles.container}
    >
      <StatusBar backgroundColor='#0066ff' barStyle='light-content'/>
      <View style={styles.searchBar}>
        <TextInput
          placeholder = 'Nome da cidade'
          returnKeyType = "search"
          style = {styles.input}
          value = {inputData}
          onChangeText = {text => setInputData(text)}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={() => {
            navigation.navigate('ByCityNamePage', {cityToSearch: inputData})
            setInputData('')
          }
        }>
          <Icon name='search' size={30} color='#222'/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.locationTouch} onPress={goToLocation}>
        <Text>Sua localização</Text>
        <Icon name='location-searching' size={24} color='#323232'/>
      </TouchableOpacity>

      <View style={styles.shortCutsView}>
        <FlatList
          showsVerticalScrollIndicator = {false}
          data = {shortCuts}
          renderItem = {({item, index}) => 
            <Animatable.View
              animation = 'bounceInRight'
              duration = {item.animation}
            >
              <ShortCut
                name={item.cityName}
                mainAction = {() => navigation.navigate('ByCityNamePage', {cityToSearch: item.cityName})}
                deleteAction = {() => deleteShortCut(item.key)}
              />
            </Animatable.View>
          }
          ListFooterComponent = {() => 
            <View style={{height: 70}}>
              <TouchableOpacity style={[styles.addShortCutButton, {display: shortCuts.length < 7 ? 'flex' : 'none'}]} onPress={() => setModalOpen(true)}>
                <Text style={styles.addShortCutText}>Adicionar atalho</Text>
              </TouchableOpacity>
            </View>
          }
          ListFooterComponentStyle = {{marginBottom: 30}}
        />   
      </View>
      <Modal
        visible = {modalOpen}
        animationType = 'fade'
        transparent = {true}
        statusBarTranslucent = {true}
      >
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior = 'position'
            contentContainerStyle = {styles.modalPrompt}
          >
            <TextInput
              style = {styles.modalInput}
              placeholder = 'Nome da cidade'
              value = {modalCity}
              onChangeText = {text => setModalCity(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addShortCut}>
              <Text style={styles.saveShortCutText}>Salvar atalho</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.cancelShortCutButton} onPress={() => {setModalCity(''); setModalOpen(false)}}>
            <Text style={styles.cancelShortCutText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
      marginTop: 20,
      marginBottom: 25,
      paddingRight: 12,
      flexDirection: 'row',
      alignSelf: 'center',
      width: '90%',
      alignItems: 'center',
      backgroundColor: '#ddddddbb',
      borderRadius: 20,
    },
    input: {
      flex: 8,
      padding: 8,
      paddingLeft: 14,
      fontSize: 22,
      textAlignVertical: 'bottom'
    },
    searchIcon: {
      flex: 1
    },
    locationTouch: {
      flexDirection: 'row',
      width: '75%',
      margin: 15,
      marginBottom: 30,
      padding: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      backgroundColor: '#ffffffcc',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'center'
    },
    addShortCutButton: {
      alignSelf: 'center',
      backgroundColor: '#ff9900',
      padding: 12,
      marginTop: 28,
      margin: 6,
      borderRadius: 12
    },
    addShortCutText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold'
    },
    modalContainer: {
      flex: 1,
      backgroundColor: '#555555aa',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalPrompt: {
      backgroundColor: '#fff',
      width: '65%',
      aspectRatio: 1,
      borderRadius: 20,
      elevation: 10,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    modalInput: {
      width: '85%',
      textAlign: 'center',
      textAlignVertical: 'bottom',
      borderBottomWidth: 2,
      borderBottomColor: '#0066ff'
    },
    modalButton: {
      backgroundColor: 'orange',
      padding: 4,
      width: '70%',
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12
    },
    saveShortCutText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    },
    cancelShortCutButton: {
      position: 'absolute',
      bottom: 60,
      borderWidth: 2,
      borderColor: '#eeeeee',
      padding: 4,
      borderRadius: 8
    },
    cancelShortCutText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#eeeeee',
    },
    shortCutsView: {
      flex: 1
    }
})