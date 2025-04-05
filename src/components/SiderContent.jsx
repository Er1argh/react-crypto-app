import React from 'react'
import { Card, List, Statistic, Tag, Typography } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

import { capitalize } from '../utils'

import { useCrypto } from '../context/crypto-context'

const SiderContent = () => {
  const { cryptoAssets } = useCrypto()

  return (
    <>
      {cryptoAssets.map(cryptoAsset => (
        <Card key={cryptoAsset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(cryptoAsset.id)}
            value={cryptoAsset.totalPrice}
            precision={2}
            valueStyle={{ color: cryptoAsset.grow ? '#3f8600' : '#cf1322' }}
            prefix={cryptoAsset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: cryptoAsset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: cryptoAsset.amount, isPlain: true },
            ]}
            renderItem={item => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={cryptoAsset.grow ? 'green' : 'red'}>{cryptoAsset.growPercent}%</Tag>}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={cryptoAsset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </>
  )
}

export default SiderContent
