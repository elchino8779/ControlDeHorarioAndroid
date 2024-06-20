import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import color from '../assets/colors'
import { useCalendarContext } from '../context/CalendarContext'
import CardDays from './CardDays'
import Resultado from './Resultado'
import { useStorageContext } from '../context/StorageContext'

const cardInitialDate = {
  entrada: '--:--',
  salida: '--:--',
  entradaCantidad: "",
  salidaCantidad: "",
  lugar: "",
  corrido: true,
  feriado: true,
  horasTotalesView: 0,
  horasNormalesView: 0,
  horas50View: 0,
  horas100View: 0
}

const Quincena = () => {

  const { fechaQuincena, arrayDays } = useCalendarContext()
  const { storage } = useStorageContext()

  useEffect(() => {

    storage.load({
      key: fechaQuincena,
    })
      .catch(err => {
        if (err.name == 'NotFoundError') {

          let cardDate = {}
          arrayDays.forEach(el => {
            cardDate = { ...cardDate, [el]: cardInitialDate }
          })

          storage.save({
            key: fechaQuincena,
            data: {
              ...cardDate
            },
            expires: null
          });
        }
      })

  }, [arrayDays])


  return (
    <View style={styles.container}>
      {fechaQuincena && <Text style={styles.title}>{fechaQuincena}</Text>}
      {arrayDays.length > 0 &&
        <ScrollView style={styles.cardsContainer} >
          {arrayDays.map((el, index) => <CardDays key={index} el={el} fechaQuincena={fechaQuincena} arrayDays={arrayDays} />)}
          <Resultado fechaQuincena={fechaQuincena} />
        </ScrollView>
      }
    </View>
  )
}

export default Quincena

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 15
  },

  title: {
    width: '95%',
    color: color.text200,
    backgroundColor: color.bg200,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    elevation: 20,
    borderColor: color.primary100,
    borderWidth: 3,
    marginBottom: 10
  },

  cardsContainer: {
    width: '100%'
  }
})