import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { postTokenDetail, postgetTokenTransaction } from '../../src/api/index'
import TokenInfoDetail from '../../src/components/pageComps/token/tokenInfoDetail/index'
import styles from '../blocks/page_padding.module.scss'
import TokendoubleTable from '../../src/components/commonComps/explorerDataTable/index'
import { TokenListDetail, TokenIssuanceRecrod, TokenTransactionsRecords } from '../../src/models/interface/token'
import { tokenInfocolumns } from '../../src/models/commonData/tableColumns'
type Props = {

};

const TokenInfo = (props: Props) => {
    const router = useRouter()
    const { Id } = router.query

    const [detailData, setdetailData] = useState<TokenListDetail>(
        {
            Symbol: '',
            TokenId: '',
            IconUrl: '',
            TotalSupply: 0,
            CurrentSupply: 0,
            RegisterTime: 0,
            Issuer: '',
            Maker: '',
            Unity: 0,
            Describe: '',
            TokenType: 0
        }
    )
    const [spinshow, setspinshow] = useState(false)
    const [postDataone, setpostDataone] = useState<TokenTransactionsRecords>({ Id: '', page: 1, size: 10 })
    const [postDatatwo, setpostDatatwo] = useState<TokenIssuanceRecrod>({ Id: '', page: 1, size: 10, Type: ['issue', 'destroy'] })
    useEffect(() => {
        if (Id) {
            setpostDataone({ Id: Id as string, page: 1, size: 10 })
            setpostDatatwo({ Id: Id as string, page: 1, size: 10, Type: ['issue', 'destroy'] })
            postTokenDetail(Id as string).then(res => {
                let code = res.data.code
                if (!code) {
                    setdetailData(res.data.data)
                    setspinshow(true)
                }
            })
        }
    }, [Id])

    return (
        <div className={styles.page_padding}>
            <TokenInfoDetail
                detailData={detailData}
                spinshow={spinshow}
            />
            <TokendoubleTable
                tableType="doubletokenTable"
                columnsData={tokenInfocolumns}
                doublecolumnsData={tokenInfocolumns}
                tableTitle={'Transactions Records'}
                doubletableTitle={'Issuance & Destruction Recrod'}
                postData={postDataone}
                initalPostData={postDataone}
                doubleinitalPostData={postDatatwo}
                doublepostData={postDatatwo}
                loadTableListFun={postgetTokenTransaction}
                doubleloadTableListFun={postgetTokenTransaction}
            />
        </div>
    )
}

export default TokenInfo