import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Vibration, Text } from 'react-native'
import color from '../assets/colors'
import { AntDesign } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useCalendarContext } from '../context/CalendarContext';
import { useStorageContext } from '../context/StorageContext';

const NavBar = () => {

  const [alertView, setAlertView] = useState(false)
  const { handleFechaQuincena } = useCalendarContext()
  const { storage } = useStorageContext()

  const handleView = () => {
    Vibration.vibrate(100)
    setAlertView(!alertView)
  }

  const handleDate = (value) => {
    setAlertView(!alertView)

    if (value.type == 'set') {
      let timeStamp = value.nativeEvent.timestamp
      let date = new Date(timeStamp);
      handleFechaQuincena(date);
      Vibration.vibrate(500)
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleView}>
        <AntDesign name="pluscircle" size={30} color={color.accent100} />
      </TouchableOpacity>
      <Text style={styles.title}>Control de Horarios</Text>
      {alertView &&
        <RNDateTimePicker
          mode="date"
          display='calendar'
          value={new Date()}
          maximumDate={new Date(2030, 10, 20)}
          minimumDate={new Date(2023, 12, 1)}
          negativeButton={{ label: 'Cancelar', textColor: 'red' }}
          positiveButton={{ label: 'Ok', textColor: 'green' }}
          onChange={(value) => handleDate(value)}
        />
      }
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: color.bg200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10
  },

  title: {
    color: color.text200,
    fontSize: 23,
    fontWeight: 'bold'
  }
})