import React from 'react'
import { StyleSheet, View, SafeAreaView, StatusBar, } from 'react-native'
import NavBar from './NavBar'
import color from '../assets/colors'
import Quincena from './Quincena'
import { CalendarContextProvider } from '../context/CalendarContext'
import { CantidadHorasProvider } from '../context/CantidadHorasContext'
import { StorageProvider } from '../context/StorageContext'

const Page = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={color.bg200}
        barStyle={'light-content'}
        hidden={false}
        translucent={false}
      />
      <CalendarContextProvider>
        <CantidadHorasProvider>
          <StorageProvider>
            <NavBar />
            <Quincena />
          </StorageProvider>
        </CantidadHorasProvider>
      </CalendarContextProvider>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: color.bg100,
    alignItems: 'center'
  }
})