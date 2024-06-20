import { createContext, useContext, useState } from "react";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageContext = createContext();
const useStorageContext = () => {
  return useContext(StorageContext);
}

const StorageProvider = ({ children }) => {

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
  })


  const values = { storage }

  return (
    <StorageContext.Provider value={values}>
      {children}
    </StorageContext.Provider>
  )
}

export { useStorageContext, StorageProvider }