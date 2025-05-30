import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import { useCrypto } from '../context/crypto-context'

ChartJS.register(ArcElement, Tooltip, Legend)

const PortfolioChart = () => {
  const { cryptoAssets } = useCrypto()

  const data = {
    labels: cryptoAssets.map(cryptoAsset => cryptoAsset.name),
    datasets: [
      {
        label: '$',
        data: cryptoAssets.map(cryptoAsset => cryptoAsset.totalPrice),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  }

  return (
    <div style={{ display: 'flex', marginBottom: '2rem', justifyContent: 'center', height: 400 }}>
      <Pie data={data} />
    </div>
  )
}

export default PortfolioChart
