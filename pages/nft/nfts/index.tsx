import React, { useEffect } from 'react'
import { getLeastNft } from '../../../src/api';
import NftsTable from '../../../src/components/commonComps/explorerDataTable'
import { NftsColumns } from '../../../src/models/commonData/tableColumns';
type Props = {};
const postData = { page: 1, size: 20 }
const Nfts = (props: Props) => {
    useEffect(() => {

    }, [])
    return (
        <div>
            <NftsTable
                tableTitle='List of Nfts'
                columnsData={NftsColumns}
                postData={postData}
                initalPostData={postData}
                loadTableListFun={getLeastNft}
                tableType='nfts'
            />
        </div>
    )
}

export default Nfts