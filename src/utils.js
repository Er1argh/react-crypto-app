export const percentDifference = (a, b) => {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

export const calculateAveragePrice = (existingAsset, newAsset) => {
  return +(
    (existingAsset.price * existingAsset.amount + newAsset.price * newAsset.amount) /
    (existingAsset.amount + newAsset.amount)
  ).toFixed(2)
}
