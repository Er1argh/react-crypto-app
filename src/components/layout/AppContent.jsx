import React from 'react'
import { Layout, Typography } from 'antd'

import { useCrypto } from '../../context/crypto-context'

import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

const AppContent = () => {
  const { cryptoAssets, cryptoData } = useCrypto()

  const cryptoPriceMap = cryptoData.reduce((acc, coin) => {
    acc[coin.id] = coin.price
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {cryptoAssets
          .map(cryptoAsset => cryptoAsset.amount * cryptoPriceMap[cryptoAsset.id])
          .reduce((acc, value) => (acc += value), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}

export default AppContent
