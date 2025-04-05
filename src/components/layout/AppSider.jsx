import React from 'react'
import { Layout } from 'antd'

import SiderContent from '../SiderContent'

const siderStyle = { padding: '1rem' }

const AppSider = () => {
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <SiderContent />
    </Layout.Sider>
  )
}

export default AppSider
