import React, { createContext, useContext, useEffect, useState } from 'react'

import { fakeFetchCryptoAssets, fakeFetchCryptoData } from '../api'

import { calculateAveragePrice, percentDifference } from '../utils'

const CryptoContext = createContext({
  cryptoAssets: [],
  cryptoData: [],
  isCryptoLoading: false,
})

export const CryptoContextProvider = ({ children }) => {
  const [isCryptoLoading, setIsCryptoLoading] = useState(false)
  const [cryptoError, setCryptoError] = useState('')
  const [cryptoData, setCryptoData] = useState([])
  const [cryptoAssets, setCryptoAssets] = useState([])

  const mapCryptoAssets = (cryptoAssets, cryptoData) => {
    return cryptoAssets.map(cryptoAsset => {
      const coin = cryptoData.find(coin => coin.id === cryptoAsset.id)
      if (!coin) {
        return cryptoAsset
      }
      const currentPrice = coin.price
      const purchasePrice = cryptoAsset.price
      const amount = cryptoAsset.amount
      const profit = amount * (currentPrice - purchasePrice)
      const grow = profit >= 0
      return {
        ...cryptoAsset,
        name: coin.name,
        grow,
        growPercent: percentDifference(purchasePrice, currentPrice),
        totalPrice: amount * currentPrice,
        totalProfit: profit,
        price: purchasePrice,
      }
    })
  }

  useEffect(() => {
    const preload = async () => {
      try {
        setIsCryptoLoading(true)
        const cryptoData = await fakeFetchCryptoData()
        const cryptoAssets = await fakeFetchCryptoAssets()
        setCryptoData(cryptoData.result)
        setCryptoAssets(mapCryptoAssets(cryptoAssets, cryptoData.result))
      } catch (error) {
        setCryptoError(error.message)
      } finally {
        setIsCryptoLoading(false)
      }
    }
    preload()
  }, [])

  const addCryptoAsset = newAsset => {
    setCryptoAssets(prev => {
      const existingIndex = prev.findIndex(asset => asset.id === newAsset.id)
      if (existingIndex > -1) {
        const existingAsset = prev[existingIndex]
        const updatedAsset = {
          ...existingAsset,
          amount: existingAsset.amount + newAsset.amount,
          price: calculateAveragePrice(existingAsset, newAsset),
        }
        const updatedAssets = [...prev]
        updatedAssets[existingIndex] = updatedAsset
        return mapCryptoAssets(updatedAssets, cryptoData)
      }
      return mapCryptoAssets([...prev, newAsset], cryptoData)
    })
  }

  return (
    <CryptoContext.Provider value={{ cryptoAssets, cryptoData, isCryptoLoading, cryptoError, addCryptoAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export const useCrypto = () => {
  return useContext(CryptoContext)
}

export default CryptoContext
