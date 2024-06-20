import { createContext, useContext, useState } from "react";
import calendar from '../assets/calendar.json'

const CalendarContext = createContext();

const useCalendarContext = () => {
  return useContext(CalendarContext)
}


const CalendarContextProvider = ({ children }) => {

  const [fechaQuincena, setFechaQuincena] = useState('')
  const [arrayDays, setArrayDays] = useState([])

  const handleFechaQuincena = (date) => {

    let primeraSegunda = date.getDate() <= 15 ? '1ra' : '2da';

    let mesNumero = date.getMonth();
    let mesPalabra;
    switch (date.getMonth()) {
      case 0: mesPalabra = 'Enero'
        break;
      case 1: mesPalabra = 'Febrero'
        break;
      case 2: mesPalabra = 'Marzo'
        break;
      case 3: mesPalabra = 'Abril'
        break;
      case 4: mesPalabra = 'Mayo'
        break;
      case 5: mesPalabra = 'Junio'
        break;
      case 6: mesPalabra = 'Julio'
        break;
      case 7: mesPalabra = 'Agosto'
        break;
      case 8: mesPalabra = 'Septiembre'
        break;
      case 9: mesPalabra = 'Octubre'
        break;
      case 10: mesPalabra = 'Noviembre'
        break;
      case 11: mesPalabra = 'Diciembre'
        break;
      default:
        break;
    }

    let anio = date.getFullYear();

    setFechaQuincena(`${primeraSegunda} Quincena de ${mesPalabra} de ${anio}`)
    setArrayDays(calendar[anio][mesNumero][primeraSegunda])
  }

  const values = { fechaQuincena, handleFechaQuincena, arrayDays }

  return (
    <CalendarContext.Provider value={values}>
      {children}
    </CalendarContext.Provider>
  )
}

export { useCalendarContext, CalendarContextProvider }