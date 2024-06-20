import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Vibration } from 'react-native'
import color from '../assets/colors'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CheckBox from './CheckBox';
import moment from 'moment';
import { useCantidadHorasContext } from '../context/CantidadHorasContext';
import { useStorageContext } from '../context/StorageContext';


const CardDays = ({ el, fechaQuincena, arrayDays }) => {

  const [entradaPickerView, setEntradaPickerView] = useState(false)
  const [salidaPickerView, setSalidaPickerView] = useState(false)
  const [entrada, setEntrada] = useState('--:--')
  const [salida, setSalida] = useState('--:--')
  const [entradaCantidad, setEntradaCantidad] = useState('')
  const [salidaCantidad, setSalidaCantidad] = useState('')
  const [lugar, setLugar] = useState('')
  const [corrido, setcorrido] = useState(true)
  const [feriado, setFeriado] = useState(true)
  const [horasTotalesView, sethorasTotalesView] = useState(0)
  const [horasNormalesView, sethorasNormalesView] = useState(0)
  const [horas50View, sethoras50View] = useState(0)
  const [horas100View, sethoras100View] = useState(0)
  const [contextView, setContextView] = useState(false)

  const { handleAdd, handleResetResultados } = useCantidadHorasContext()
  const { storage } = useStorageContext()


  let borderColor = el.includes('Dom') || !feriado ? color.accent100 : color.primary100;
  let fontColor = el.includes('Dom') || !feriado ? color.accent100 : color.text200;


  const loadStorage = () => {
    setTimeout(() => {
      storage.load({
        key: fechaQuincena
      })
        .then(res => {
          setEntrada(res[el].entrada)
          setSalida(res[el].salida)
          setLugar(res[el].lugar)
          setcorrido(res[el].corrido)
          setFeriado(res[el].feriado)
          sethorasTotalesView(res[el].horasTotalesView)
          sethorasNormalesView(res[el].horasNormalesView)
          sethoras50View(res[el].horas50View)
          sethoras100View(res[el].horas100View)
          setEntradaCantidad(res[el].entradaCantidad)
          setSalidaCantidad(res[el].salidaCantidad)
        })
    }, 150);
  }

  const saveStorage = () => {

    setTimeout(() => {
      storage.load({
        key: fechaQuincena
      })
        .then(res => {
          storage.save({
            key: fechaQuincena,
            data: {
              ...res, [el]: {
                entrada,
                salida,
                entradaCantidad,
                salidaCantidad,
                lugar,
                corrido,
                feriado,
                horasTotalesView,
                horasNormalesView,
                horas50View,
                horas100View
              }
            },
            expires: null
          });
        })
    }, 150);
  }


  const handleReset = () => {
    setEntrada('--:--')
    setSalida('--:--')
    setEntradaCantidad("")
    setSalidaCantidad("")
    setLugar("")
    setcorrido(true)
    setFeriado(true)
    sethorasTotalesView(0)
    sethorasNormalesView(0)
    sethoras50View(0)
    sethoras100View(0)
    Vibration.vibrate(200)
  }

  const handleEntradaView = () => {
    Vibration.vibrate(100)
    setEntradaPickerView(true)
  }

  const handleSalidaView = () => {
    Vibration.vibrate(100)
    setSalidaPickerView(true)
  }

  const handleEntrada = (value) => {
    setEntradaPickerView(false)
    if (value.type == 'set') {
      let horarioCompleto = new Date(value.nativeEvent.timestamp).toString();
      let horario = horarioCompleto.slice(-17, -12)
      setEntrada(horario)
      setEntradaCantidad(moment(value.nativeEvent.timestamp))
      Vibration.vibrate(150)
    }
  }

  const handleSalida = (value) => {
    setSalidaPickerView(false)
    if (value.type == 'set') {
      let horarioCompleto = new Date(value.nativeEvent.timestamp).toString();
      let horario = horarioCompleto.slice(-17, -12)
      setSalida(horario)
      setSalidaCantidad(moment(value.nativeEvent.timestamp))
      Vibration.vibrate(150)
    }
  }

  const handleViewTotales = () => {
    if ((entradaCantidad != "" && entradaCantidad != undefined) && (salidaCantidad != "" && salidaCantidad != undefined)) {
      let entradaMoment = moment(entradaCantidad)
      let salidaMoment = moment(salidaCantidad)
      let cantidadDeHorasTotales = salidaMoment.diff(entradaMoment, 'hours', 'minutes');
      if (corrido) cantidadDeHorasTotales--
      if (cantidadDeHorasTotales % 1) {
        let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
        let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
        cantidadDeHorasTotales = parseFloat(`${horasLet}.${minutosLet}`)
      }
      sethorasTotalesView(cantidadDeHorasTotales)
    }
  }

  const handle50100 = () => {

    let horasNormales = 0;
    let minutosNormales = 0;
    let horas50 = 0;
    let minutos50 = 0;
    let horas100 = 0;
    let minutos100 = 0;

    if ((entradaCantidad != "" && entradaCantidad != undefined) && (salidaCantidad != "" && salidaCantidad != undefined)) {

      let entradaMoment = moment(entradaCantidad)
      let salidaMoment = moment(salidaCantidad)

      let cantidadDeHorasTotales = salidaMoment.diff(entradaMoment, 'hours', 'minutes');
      if (corrido) cantidadDeHorasTotales--
      if (cantidadDeHorasTotales % 1) cantidadDeHorasTotales = cantidadDeHorasTotales.toFixed(2)

      if (el.includes('Dom')) {
        if (cantidadDeHorasTotales % 1) {
          let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
          let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
          horas100 = parseFloat(`${horasLet}.${minutosLet}`)
        }
        else {
          horas100 = cantidadDeHorasTotales
        }
        if (!feriado) horasNormales = 8
      }
      else if (el.includes('Sáb')) {

        if ((entradaCantidad != "" && entradaCantidad != undefined) && (salidaCantidad != "" && salidaCantidad != undefined)) {

          let entradaMoment = moment(entradaCantidad)
          let salidaMoment = moment(salidaCantidad)

          let cantidadDeHorasTotales = salidaMoment.diff(entradaMoment, 'hours', 'minutes');
          let cantidadDeMinutosTotales = 0;
          if (cantidadDeHorasTotales % 1 != 0) {
            cantidadDeMinutosTotales = parseInt(cantidadDeHorasTotales.toString().split('.')[1])
          }
          let horaEntradaLet = new Date(entradaCantidad).getHours();
          let horaSalidaLet = new Date(salidaCantidad).getHours();

          if (horaSalidaLet > 12) {
            horas50 = 13 - horaEntradaLet - 1;
            horas100 = horaSalidaLet - 13;
            if (horaSalidaLet == 12) {
              minutos50 = parseInt(cantidadDeMinutosTotales.toString().slice(0, 2));
            }
            else {
              minutos100 = parseInt(cantidadDeMinutosTotales.toString().slice(0, 2));
            }

            if (!corrido) {
              if (horaSalidaLet == 12) {
                horas50++
              }
              else {
                horas100++
              }
            }
          }
        }
        else {
          if (cantidadDeHorasTotales % 1 != 0) {
            let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
            let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
            horas50 = parseFloat(`${horasLet}.${minutosLet}`) - 1
          }
          else {
            horas50 = cantidadDeHorasTotales - 1
          }
          if (!corrido) horas50++
        }

        if (!feriado) {
          horasNormales = 0;
          minutosNormales = 0;
          horas50 = 0;
          minutos50 = 0;
          horas100 = cantidadDeHorasTotales - 1;
          minutos100 = 0;

          if (cantidadDeHorasTotales % 1 != 0) {
            let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
            let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
            horas100 = parseFloat(`${horasLet}.${minutosLet}`) - 1
          }
          else {
            horas100 = cantidadDeHorasTotales - 1
          }
          if (!corrido) horas100++
        }
      }
      else {
        if ((entradaCantidad != "" && entradaCantidad != undefined) && (salidaCantidad != "" && salidaCantidad != undefined)) {

          let entradaMoment = moment(entradaCantidad)
          let salidaMoment = moment(salidaCantidad)

          let cantidadDeHorasTotales = salidaMoment.diff(entradaMoment, 'hours', 'minutes');
          let cantidadDeMinutosTotales = 0;
          if (cantidadDeHorasTotales % 1 != 0) {
            cantidadDeMinutosTotales = parseInt(cantidadDeHorasTotales.toString().split('.')[1])
          }

          if (corrido) cantidadDeHorasTotales--;

          if (cantidadDeHorasTotales > 9) {

            horasNormales = 9;
            horas50 = cantidadDeHorasTotales - 9;

            if (horas50 % 1 != 0) {
              let horasLet = parseInt(cantidadDeHorasTotales.toString().split('.')[0])
              let minutosLet = parseInt(cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2))
              horas50 = parseFloat(`${horasLet - 9}.${minutosLet}`);
            }

          }
          else {
            horasNormales = cantidadDeHorasTotales;
            if (cantidadDeHorasTotales % 1 != 0) {
              let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
              let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
              horasNormales = parseFloat(`${horasLet}.${minutosLet}`)
            }
          }

          if (!feriado) {
            if (cantidadDeHorasTotales % 1 != 0) {
              let horasLet = cantidadDeHorasTotales.toString().split('.')[0]
              let minutosLet = cantidadDeHorasTotales.toString().split('.')[1].slice(0, 2)
              horas100 = parseFloat(`${horasLet}.${minutosLet}`)
            }
            else {
              horas100 = cantidadDeHorasTotales;
            }

            horasNormales = 0;
            minutosNormales = 0;
            horas50 = 0;
            minutos50 = 0;
            minutos100 = 0;
          }

        }
      }

    }
    else {
      if (!feriado) {
        horasNormales = 8;
        sethorasTotalesView(8)
      }
      else {
        sethorasTotalesView(0)
      }
    }

    minutosNormales ? sethorasNormalesView(`${horasNormales}.${minutosNormales}`) : sethorasNormalesView(horasNormales)
    minutos50 ? sethoras50View(`${horas50}.${minutos50}`) : sethoras50View(horas50)
    minutos100 ? sethoras100View(`${horas100}.${minutos100}`) : sethoras100View(horas100)
  }


  useEffect(() => {
    handleViewTotales()
    handle50100()
    saveStorage()
  }, [entradaCantidad, salidaCantidad, corrido, feriado])

  useEffect(() => {
    setContextView({ el, horasNormalesView, horas50View, horas100View })
    saveStorage()
  }, [horasNormalesView, horas50View, horas100View])

  useEffect(() => {
    (contextView) && handleAdd(contextView)
  }, [contextView])

  useEffect(() => {
    setContextView(false)
    handleAdd({ el, horasNormalesView: 0, horas50View: 0, horas100View: 0 })
    handleResetResultados()
  }, [fechaQuincena])

  useEffect(() => {
    loadStorage()
  }, [arrayDays])

  useEffect(() => {
    saveStorage()
  }, [lugar])


  return (
    <View style={styles.container}>

      {entradaPickerView &&
        <RNDateTimePicker
          mode="time"
          display='clock'
          is24Hour={true}
          value={new Date()}
          onChange={handleEntrada}
        />}

      {salidaPickerView &&
        <RNDateTimePicker
          mode="time"
          display='clock'
          is24Hour={true}
          value={new Date()}
          onChange={handleSalida}
        />}

      <View style={[styles.content, { borderColor: borderColor }]}>

        <View style={styles.dayAndResetContainer}>
          <Text style={[styles.day, { color: fontColor }]}>{el}</Text>
          <TouchableOpacity onPress={handleReset}>
            <Feather name="refresh-ccw" size={25} color={color.accent100} />
          </TouchableOpacity>
        </View>

        <View style={styles.horarios}>

          <TouchableOpacity style={styles.touchable} onPress={handleEntradaView}>
            <Text style={styles.text}>Entrada</Text>
            <Entypo name="arrow-bold-down" size={32} color={color.accent100} />
            <View style={styles.input}>
              <Text style={styles.inputHora}>{entrada}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchable} onPress={handleSalidaView}>
            <Text style={styles.text}>Salida</Text>
            <Entypo name="arrow-bold-up" size={32} color={color.primary200} />
            <View style={styles.input}>
              <Text style={styles.inputHora}>{salida}</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.lugarContainer}>
          <Text style={styles.lugarText}>Lugar:</Text>
          <TextInput style={styles.lugarInput} value={lugar} onChangeText={(valor) => setLugar(valor)} />
        </View>

        <View style={styles.checks}>
          <View style={styles.checksContainer}>
            <View style={styles.textandcheck}>
              <Text style={styles.textCheckbox}>Corrido:</Text>
              <CheckBox setter={setcorrido} getter={corrido} />
            </View>
            <View style={styles.textandcheck}>
              <Text style={styles.textCheckbox}>Feriado:</Text>
              <CheckBox setter={setFeriado} getter={feriado} />
            </View>
          </View>
        </View>

        <View style={styles.horas}>
          {horasTotalesView > 0 &&
            <>
              <View style={styles.cantidadContainer}>
                <Text style={styles.cantidadTitle}>Totales:</Text>
                <Text style={styles.cantidadText}>{horasTotalesView > 0 && horasTotalesView}</Text>
              </View>
              <View style={styles.otrasHorasContainer}>
                <>
                  {horasNormalesView > 0 && <Text style={styles.otrasHorasText}>Normal: {horasNormalesView}</Text>}
                  {horas50View > 0 && <Text style={styles.otrasHorasText50}>50%: {horas50View}</Text>}
                  {horas100View > 0 && <Text style={styles.otrasHorasText100}>100%: {horas100View}</Text>}
                </>
              </View>
            </>
          }
        </View>
      </View>
    </View>
  )
}

export default CardDays

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },

  content: {
    width: '95%',
    height: '95%',
    backgroundColor: color.bg200,
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    shadowColor: '#000',
    elevation: 15,
    gap: 10

  },

  dayAndResetContainer: {
    flexDirection: 'row',
    backgroundColor: color.bg300,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },

  day: {
    color: color.text200,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    alignSelf: 'center',
  },

  horarios: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },

  touchable: {
    alignItems: 'center',
    gap: 5
  },

  text: {
    color: color.text200,
    fontSize: 18,
    fontWeight: 'bold'
  },

  input: {
    width: 110,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.bg300,
    borderRadius: 10,
    borderColor: color.primary100,
    borderWidth: 2
  },

  inputHora: {
    color: color.primary300,
    fontSize: 26
  },

  lugarContainer: {
    width: '100%',
    height: 50,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  lugarText: {
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
    color: color.text200
  },

  lugarInput: {
    width: '65%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: color.bg100,
    paddingHorizontal: 10,
    color: color.primary200,
    fontSize: 20,
    fontWeight: 'bold'
  },

  checksContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    flexDirection: 'row'
  },

  textandcheck: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },

  textCheckbox: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.text200
  },

  horas: {
    width: '100%',
    height: 150,
    backgroundColor: color.bg100,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },

  cantidadContainer: {
    width: '50%',
    height: '100%',
    backgroundColor: color.bg300,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  cantidadTitle: {
    fontSize: 24,
    color: color.text200
  },

  cantidadText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: color.text200
  },

  otrasHorasContainer: {
    width: '49%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },

  otrasHorasText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.text200,
    textAlign: 'center'
  },

  otrasHorasText50: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.primary200,
    textAlign: 'center'
  },

  otrasHorasText100: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color.accent100,
    textAlign: 'center'
  }
})