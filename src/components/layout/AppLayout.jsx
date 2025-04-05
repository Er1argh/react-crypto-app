import React, { useContext } from 'react'
import { Layout, Result, Spin } from 'antd'

import CryptoContext from '../../context/crypto-context'

import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import useScreenSize from '../../hooks/useScreenSize'

const AppLayout = () => {
  const { isCryptoLoading, cryptoError } = useContext(CryptoContext)
  const screenSize = useScreenSize()
  const isMobile = screenSize.width <= 910

  if (isCryptoLoading) {
    return <Spin fullscreen />
  }

  if (cryptoError) {
    return <Result status="error" title="Something went wrong" subTitle={cryptoError} />
  }

  return (
    <Layout>
      <AppHeader isMobile={isMobile} />
      <Layout>
        {!isMobile && <AppSider />}
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default AppLayout
