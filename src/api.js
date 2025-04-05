import { cryptoData, cryptoAssets } from './data'

export const fakeFetchCryptoData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1)
  })
}

export const fakeFetchCryptoAssets = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1)
  })
}
