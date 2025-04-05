import React, { useEffect, useState } from 'react'
import { Button, Drawer, Layout, Modal, Select, Space } from 'antd'

import { useCrypto } from '../../context/crypto-context'

import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'
import SiderContent from '../SiderContent'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
}

const AppHeader = ({ isMobile }) => {
  const { cryptoData } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSiderDrawerOpen, setIsSiderDrawerOpen] = useState(false)

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setIsSelectOpen(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => {
      window.removeEventListener('keypress', keypress)
    }
  }, [])

  const handleSelect = value => {
    setCoin(cryptoData.find(coin => coin.id === value))
    setIsModalOpen(true)
  }

  return (
    <Layout.Header style={headerStyle}>
      {isMobile && (
        <Button type="primary" onClick={() => setIsSiderDrawerOpen(true)}>
          My Assets
        </Button>
      )}
      <Select
        style={{ width: isMobile ? 180 : 250 }}
        onSelect={handleSelect}
        open={isSelectOpen}
        onClick={() => setIsSelectOpen(prev => !prev)}
        value="press / to open"
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
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Asset
      </Button>
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer width={600} title="Add Asset" onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen} destroyOnClose>
        <AddAssetForm onClose={() => setIsDrawerOpen(false)} />
      </Drawer>
      <Drawer
        title="Assets"
        placement="left"
        onClose={() => setIsSiderDrawerOpen(false)}
        open={isSiderDrawerOpen}
        width={300}>
        <SiderContent />
      </Drawer>
    </Layout.Header>
  )
}

export default AppHeader
