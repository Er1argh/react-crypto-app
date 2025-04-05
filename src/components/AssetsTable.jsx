import React from 'react'
import { Table } from 'antd'

import { useCrypto } from '../context/crypto-context'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
]

const AssetsTable = () => {
  const { cryptoAssets } = useCrypto()

  const data = cryptoAssets.map(cryptoAsset => ({
    key: cryptoAsset.id,
    name: cryptoAsset.name,
    price: cryptoAsset.price,
    amount: cryptoAsset.amount,
  }))

  return <Table pagination={false} columns={columns} dataSource={data} scroll={{ x: true }} />
}

export default AssetsTable
