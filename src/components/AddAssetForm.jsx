import React, { useRef, useState } from 'react'
import { Divider, Select, Space, Form, InputNumber, Button, DatePicker, Result } from 'antd'

import { useCrypto } from '../context/crypto-context'

import CoinInfo from './CoinInfo'

const AddAssetForm = ({ onClose }) => {
  const { cryptoData, addCryptoAsset } = useCrypto()
  const [form] = Form.useForm()
  const [coin, setCoin] = useState(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const assetRef = useRef(null)

  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not valid number',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const onFinish = values => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setIsFormSubmitted(true)
    addCryptoAsset(newAsset)
  }

  const handleAmountChange = value => {
    const price = form.getFieldValue('price')
    form.setFieldValue('total', +(value * price).toFixed(2))
  }

  const handlePriceChange = value => {
    const amount = form.getFieldValue('amount')
    form.setFieldValue('total', +(amount * value).toFixed(2))
  }

  if (isFormSubmitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '100%' }}
        onSelect={value => setCoin(cryptoData.find(coin => coin.id === value))}
        placeholder="Select coin"
        options={cryptoData.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
    )
  }

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
      validateMessages={validateMessages}>
      <CoinInfo coin={coin} withSymbol={false} />
      <Divider />
      <Form.Item label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
        <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddAssetForm
