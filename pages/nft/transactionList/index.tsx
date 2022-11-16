import React, { useEffect } from 'react'
import { getNftAllTransaction } from '../../../src/api';
import NftTransactionsTable from '../../../src/components/commonComps/explorerDataTable'
import { NftTransactionColumns } from '../../../src/models/commonData/tableColumns';

type Props = {};
const postData = { page: 1, size: 20 }

const NftTransactions = (props: Props) => {

    useEffect(() => {

    }, [])

    return (
        <div>
            <NftTransactionsTable
                tableTitle='List of Transactions'
                columnsData={NftTransactionColumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={getNftAllTransaction}
            />
        </div>
    )
}

export default NftTransactions