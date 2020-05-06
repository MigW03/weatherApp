import React, {useState, useEffect}from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, ScrollView} from 'react-native';

import Icon from '../components/icon'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import PreLoadedData from './preLoadedData'

export default function weatherApp({route, navigation}) {
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [temperature, setTemperature] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [pressure, setPressure] = useState('')
  const [humidity, setHumidity] = useState('')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [minTemp, setMinTemp] = useState('')
  const [maxTemp, setMaxTemp] = useState('')
  const [iconCode, setIconCode] = useState('')
  const {cityToSearch} = route.params


  
  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityToSearch}&appid=78b37a4e8794016f605c0479c504f232`)
        .then(response => response.json())
        .then(json => {
          if(json.message){
            Alert.alert('Tente novamente', 'A cidade que você procurou não foi encontrada, verifique se você digitou o nome da cidade corretamente!')
            navigation.navigate('MainPage')
          }else{
            setCityName(json.name)
            setCountry(json.sys.country)
            setTemperature((Number(json.main.temp) - 273).toFixed(0))
            setFeelsLike((Number(json.main.feels_like) - 273).toFixed(0))
            setPressure(json.main.pressure)
            setHumidity(json.main.humidity)
            setSunrise(Number(json.sys.sunrise))
            setSunset(Number(json.sys.sunset))
            setLatitude(json.coord.lat)
            setLongitude(json.coord.lon)
            setMinTemp((Number(json.main.temp_min) - 273).toFixed(0))
            setMaxTemp((Number(json.main.temp_max) - 273).toFixed(0))
            setIconCode(json.weather[0].icon)

            setDataIsLoaded(true)
          }
    })
    .catch(() => {
        Alert.alert('Sem conexão', 'Certifique-se que seu aparelho está conectado à rede e tente novamente!')

        navigation.navigate('MainPage')
    })
  }, [])

  function showCoords(){
      Alert.alert(`Coordenadas em ${cityName}`, `Latitude: ${latitude}\nLongitude: ${longitude}`)
  }

  if(dataIsLoaded == true){
    return (
      <LinearGradient
        start={{x: 0.2, y: 0.2}}
        end={{x: 0.7, y: 0.9}}
        locations={[0.2, 0.4, 0.6, 0.8, 1]}
        colors={['#0066ff', '#3385ff', '#4d9aff', '#99c2ff', '#b3d1ff']}
        style={styles.container}
      >
        <StatusBar backgroundColor='#0066ff'/>
        <View style={styles.city}>
            <Text style={styles.cityName} onPress={showCoords}>{cityName} / {country}</Text>
        </View>
        <TouchableOpacity style={styles.goBackIcon} onPress={() => navigation.navigate('MainPage')}>
          <AwesomeIcon name='arrow-left' size={24} color='#ddeedd'/>
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.quickDataView}>
            <View style={styles.degreesView}>
              <View style={styles.temperature}>
                <Text style={styles.temperatureNumber}>{temperature}</Text>
                <Text style={styles.degreeSymbol}>ºC</Text>
              </View>
              <View style={styles.weatherStateImage}>
                <Icon code={iconCode}/>
              </View>
            </View>

            <View style={styles.temperatureSensation}>
              <Text style={styles.sensationText}>Sensação térmica: {feelsLike}ºC</Text>
            </View>
          </View>

          <View style={styles.extraInfo}>
            <View style={styles.extraTempInfo}>
              <View style={styles.maxTemp}>
                <AwesomeIcon5 name='temperature-high' size={28} color='#ff3333'/>
                <Text style={styles.extraTempText}>{maxTemp}ºC</Text>
              </View>
              
              <View style={styles.minTemp}>
                <AwesomeIcon5 name='temperature-low' size={28} color='#0080ff'/>
                <Text style={styles.extraTempText}>{minTemp}ºC</Text>
              </View>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoTitle}>Pressão: </Text>
              <Text style={styles.infoValue}>{pressure}hpa</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoTitle}>Umidade: </Text>
              <Text style={styles.infoValue}>{humidity}%</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoTitle}>Nascer do sol: </Text>
              <Text style={styles.infoValue}>{new Date(sunrise * 1000).getHours()}:{new Date(sunrise * 1000).getMinutes()}</Text>
            </View>
            <View style={styles.infoLine}>
              <Text style={styles.infoTitle}>Pôr do sol: </Text>
              <Text style={styles.infoValue}>{new Date(sunset * 1000).getHours()}:{new Date(sunset * 1000).getMinutes()}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }else{
    return(
      <PreLoadedData/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  city: {
    width: '100%',
    margin: 12,
    marginTop: 20,    
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  content: {
    flex: 1,
  },
  cityName: {
    fontSize: 28,
    maxWidth: '70%',
    color: '#ddeedd',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  locationIcon: {
    paddingRight: 10
  },
  goBackIcon: {
    position: 'absolute',
    top: 35,
    left: 25,
  },
  quickDataView: {
    flex: 4,
    margin: 20,
    backgroundColor: '#eeeeee89',
    borderRadius: 24,
  },
  degreesView: {
    flex: 9,
    margin: 4,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  temperature: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureNumber: {
    fontSize: 65,
    fontWeight: 'bold',
    color: '#FFF'
  },
  degreeSymbol: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 32,
  },
  weatherStateImage: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  temperatureSensation: {
    flex: 2,
    margin: 8,
    marginTop: 0,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%'
  },
  sensationText: {
    fontSize: 16,
    color: '#fdfdfd',
    fontWeight: 'bold'
  },
  extraInfo: {
    flex: 8,
    backgroundColor: '#f2f2f2cc',
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    borderRadius: 24,
  },
  infoLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#737373'
  },
  infoValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#656565'
  },
  extraTempInfo: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  maxTemp: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  minTemp: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  extraTempText: {
    fontSize: 26,
    color: '#656565',
    fontWeight: 'bold'
  }
})
