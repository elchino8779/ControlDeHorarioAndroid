import { createContext, useContext, useEffect, useState } from "react";

const CantidadHorasContext = createContext();

const useCantidadHorasContext = () => {
  return useContext(CantidadHorasContext)
}

const CantidadHorasProvider = ({ children }) => {

  const [arrayHoras, setArrayHoras] = useState([])
  const [horasNormalesTotales, setHorasNormalesTotales] = useState(0)
  const [horas50Totales, setHoras50Totales] = useState(0)
  const [horas100Totales, setHoras100Totales] = useState(0)
  const [totalDinero, setTotalDinero] = useState(0)

  const handleAdd = (newObj) => {
    let newArray = arrayHoras.filter(entries => entries.el != newObj.el)
    newArray = newArray.filter(entries => entries.horasNormalesView != 0 || entries.horas50View != 0 || entries.horas100View != 0)
    setArrayHoras([...newArray, newObj])
  }

  const handleCalcularHoras = (precioHora) => {
    let precio = 0;
    if (precioHora) precio = parseFloat(precioHora);

    let horasNormales = 0;
    let horas50 = 0;
    let horas100 = 0;
    arrayHoras.forEach(entries => {
      horasNormales = horasNormales + entries.horasNormalesView;
      horas50 = horas50 + entries.horas50View;
      horas100 = horas100 + entries.horas100View;
    })
    setHorasNormalesTotales(horasNormales)
    setHoras50Totales(horas50)
    setHoras100Totales(horas100)

    if (precio) {
      let dineroNormales = horasNormales * precio;
      let dinero50 = horas50 * (precio + (precio / 2))
      let dinero100 = horas100 * (precio * 2)
      setTotalDinero(dineroNormales + dinero50 + dinero100)
    }
    else{
      setTotalDinero(0)
    }

  }

  const handleResetResultados = () => {
    setArrayHoras([])
    setHorasNormalesTotales(0)
    setHoras50Totales(0)
    setHoras100Totales(0)
    setTotalDinero(0)
  }




  let values = { handleAdd, handleCalcularHoras, horasNormalesTotales, horas50Totales, horas100Totales, totalDinero, handleResetResultados }

  return (
    <CantidadHorasContext.Provider value={values}>
      {children}
    </CantidadHorasContext.Provider>
  )
}

export { useCantidadHorasContext, CantidadHorasProvider }