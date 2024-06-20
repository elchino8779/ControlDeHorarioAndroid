import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Vibration } from 'react-native'
import { useCantidadHorasContext } from '../context/CantidadHorasContext'
import color from '../assets/colors'
import { Audio } from 'expo-av';

const Resultado = ({ fechaQuincena }) => {

  const { handleCalcularHoras, horasNormalesTotales, horas50Totales, horas100Totales, totalDinero } = useCantidadHorasContext()
  const [precioHora, setPrecioHora] = useState('')
  const [risa, setRisa] = useState()

  const handleResult = () => {
    Vibration.vibrate(200)
  }

  useEffect(() => {
    setPrecioHora('')
  }, [fechaQuincena])

  useEffect(() => {
    const setSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/risa.mp3')
      );
      setRisa(sound);
    }
    setSound()
  }, [])


  const handleSound = async () => {
    if (precioHora) {
      await risa.stopAsync();
      await risa.playAsync();
    }
  }


  return (
    <View style={styles.containerResultado}>
      <View style={styles.content}>
        <View style={styles.valorHoraContainer}>
          <Text style={styles.valorHoraText}>Valor Hora:</Text>
          <TextInput style={styles.valorHoraInput} value={precioHora} inputMode='numeric' onChangeText={setPrecioHora} />
        </View>
        <View style={styles.bottonContainer}>
          <TouchableOpacity style={styles.botton} onPress={() => { handleCalcularHoras(precioHora); handleResult(); handleSound() }}>
            <Text style={styles.bottonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horasContainer}>
          <Text style={styles.horasContainerNormales}>Normales: {horasNormalesTotales}</Text>
          <Text style={styles.horasContainer50}>50%: {horas50Totales}</Text>
          <Text style={styles.horasContainer100}>100% {horas100Totales}</Text>
          <Text style={styles.cantidadDinero}>Total: ${totalDinero}</Text>
        </View>
      </View>
    </View>
  )
}

export default Resultado

const styles = StyleSheet.create({
  containerResultado: {
    width: '100%',
    height: 420,
    padding: 10
  },

  content: {
    width: '100%',
    height: '100%',
    backgroundColor: color.bg200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.primary100,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  valorHoraContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },

  valorHoraText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: color.text200
  },

  valorHoraInput: {
    width: '35%',
    height: 45,
    backgroundColor: color.bg100,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: color.primary200
  },

  bottonContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  botton: {
    width: 120,
    height: 50,
    borderRadius: 10,
    backgroundColor: color.bg300,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.primary100,
    borderWidth: 2
  },

  bottonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.primary300
  },

  horasContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: color.bg100,
    alignItems: 'center',
    gap: 10
  },

  horasContainerNormales: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.text200,
  },

  horasContainer50: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.primary200,
  },

  horasContainer100: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.accent100,
  },

  cantidadDinero: {
    width: '90%',
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: color.accent200,
    fontSize: 35,
    fontWeight: 'bold'
  }

})