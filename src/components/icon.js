import React from 'react';
import { View, Text} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'


// Se icone na API for => pasta de icone => nome do icone
// 01d => FontAwesome => sun-o
// 01n => FontAwesome5 => moon
// 02d => FontAwesome5 => cloud-sun
// 02n => FontAwesome5 => cloud-moon
// 03d => fontAwesome5 => cloud-sun
// 03n => FontAwesome5 => cloud-moon
// 04d ou 04n => FontAwesome5 => cloud
// 09d ou 09n => FontAwesome5 => cloud-showers-rain
// 10d ou 10n => FontAwesome5 => cloud-rain
// 11d ou 11n => FontAwesome => flash
// 13d ou 13n => FontAwesome => snowflake-o
// 50d ou 50n => Fontisto => fog

export default function icon(props) {
    switch(props.code){
        case '01d':
            return <AwesomeIcon name='sun-o' size={67} color='#ffbe28'/>
        case '01n':
            return <AwesomeIcon5 name='moon' size={67} color='#0000aa'/>

        case '02d':
            return <AwesomeIcon5 name='cloud-sun' size={67} color='#ffbe28'/>
        case '02n':
            return <AwesomeIcon5 name='cloud-moon' size={67} color='#0000aa'/>

        case '03d':
            return <AwesomeIcon5 name='cloud-sun' size={67} color='#ffbe28'/>
        case '03n':
            return <AwesomeIcon5 name='cloud-moon' size={67} color='#0000aa'/>

        case '04d':
            return <AwesomeIcon5 name='cloud' size={67} color='#838383'/>
        case '04n':
            return <AwesomeIcon5 name='cloud' size={67} color='#838383'/>

        case '09d':
            return <AwesomeIcon5 name='cloud-showers-rain' size={67} color='#323232'/>
        case '09n':
            return <AwesomeIcon5 name='cloud-showers-rain' size={67} color='#323232'/>

        case '10d':
            return <AwesomeIcon5 name='cloud-rain' size={67} color='#999999'/>
        case '10n':
            return <AwesomeIcon5 name='cloud-rain' size={67} color='#999999'/>

        case '11d':
            return <AwesomeIcon name='flash' size={67} color='#ffcc00'/>
        case '11n':
            return <AwesomeIcon name='flash' size={67} color='#ffcc00'/>

        case '13d':
            return <AwesomeIcon name='snowflake-o' size={67} color='#FFF'/>
        case '13n':
            return <AwesomeIcon name='snowflake-o' size={67} color='#FFF'/>

        case '50d':
            return <Fontisto name='fog' size={67} color='#FFF'/>
        case '50n':
            return <Fontisto name='fog' size={67} color='#FFF'/>
    }
}
