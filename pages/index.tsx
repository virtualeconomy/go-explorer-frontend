import type { ColumnsType } from 'antd/es/table';
import type { NextPage } from 'next'
import Link from 'next/link'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import styles from '../styles/Home.module.scss'
import { getSupply, getGeneralInfo, getBlock, postTransaction, postindex } from '../src/api/index'
import { RootState } from '../src/redux/store';
import { opt } from '../src/redux/slice/commonSlice'
import { supplyInfoType, generalInfoType, BlocksDataType } from '../src/models/interface/home'
import GeneralInfo from '../src/components/pageComps/home/generalInfo'
import LastBlockTable from '../src/components/commonComps/explorerDataTable/index'
import LastTransactionTable from '../src/components/commonComps/explorerDataTable/index'
import { txColumns, BlocksColumns } from '../src/models/commonData/tableColumns'

const initalSupplyData: supplyInfoType = {
  TotalSupply: 0,
  CirculatingSupply: 0
}

const initalGeneralData: generalInfoType = {
  Version: '',
  AvgBlockDelay: '',
  CurrentHeight: 0
}


const Home: NextPage = () => {
  // const count = useSelector((state:RootState) => state.CommonSlice.count, shallowEqual)
  // const dispatch = useDispatch()
  const router = useRouter()
  const [supplyData, setSupplyData] = useState<supplyInfoType>(initalSupplyData)
  const [generalData, setGeneralData] = useState<generalInfoType>(initalGeneralData)
  const [blockInit, setblockInit] = useState({})
  const [transactionInit, settransactionInit] = useState({})

  useEffect(() => {
    try {
      getHomePageData()
    }
    catch {
      router.push('/error')
    }
  }, [])

  const getHomePageData = async () => {
    const data = (await postindex({ name: 'home' })).data.data
    if (data) {
      setSupplyData(data)
      setGeneralData(data)
      setblockInit(data.Blocks)
      settransactionInit(data.Transactions)
    } else {
      setblockInit({ message: 'no data' })
      settransactionInit({ message: 'no data' })
    }
  }

  return (
    <div className={styles.home}>
      <GeneralInfo generalData={generalData} supplyData={supplyData} />
      <LastBlockTable
        tableTitle='Last Blocks'
        viewPath="blocks"
        tableType="briefTable"
        columnsData={BlocksColumns}
        initdata={blockInit}
        loadTableListFun={getBlock} />

      <LastTransactionTable
        tableTitle='Last Transactions'
        viewPath="transactions"
        tableType="briefTable"
        columnsData={txColumns}
        initdata={transactionInit}
        loadTableListFun={postTransaction} />
    </div>
  )
}

// Do not delete these code cause maybe sometimes we need it.

// export async function getServerSideProps() {
//   try {
//     const supplyData = (await getSupply()).data.data
//     const generalData = (await getGeneralInfo()).data.data

//     return {
//       props: {
//         supplyData,
//         generalData
//       }
//     }
//   }
//   catch{
//     return { props: { error: true } }
//   }

// }

export default Home
