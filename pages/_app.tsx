import React from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../src/redux/store'
import ExplorerHead from '../src/components/commonComps/head/index'
import NavBar from '../src/components/commonComps/navBar/index'
import Footer from '../src/components/commonComps/footer/index'
import Back from '../src/components/commonComps/back'

import 'antd/dist/antd.css';
import '../styles/globals.scss'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store as any}>
      <ExplorerHead />
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <Back />
    </Provider>
  )
}

export default MyApp
