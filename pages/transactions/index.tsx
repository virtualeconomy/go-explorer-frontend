import styles from '../blocks/page_padding.module.scss'
import { postindex, postTransaction } from '../../src/api/index'
import TransactionTable from '../../src/components/commonComps/explorerDataTable/index'
import { txColumns } from '../../src/models/commonData/tableColumns'
import { useEffect, useState } from 'react'


const Transactions = () => {

    const postData = { page: 1, size: 20 }
    const [transactionInit, settransactionInit] = useState({})
    useEffect(() => {
        getTXPageData()
    }, [])
    const getTXPageData = async () => {
        const data = (await postindex({ name: 'transaction' })).data
        settransactionInit(data.data)
    }

    return (
        <div className={styles.page_padding}>
            <TransactionTable
                tableTitle='Transactions'
                columnsData={txColumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={postTransaction}
                initdata={transactionInit}
                tableType='init'
            />
        </div>
    )
}

export default Transactions
