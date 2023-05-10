import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../blocks/page_padding.module.scss'
import SupernodeDetail from '../../src/components/pageComps/supernodes/supernodeDetail/inedex'
import { postSupernodeDetail } from '../../src/api/index'
import SupernodeTable from '../../src/components/commonComps/explorerDataTable/index'
import { txColumns } from '../../src/models/commonData/tableColumns'
import { postsupernodeDetailList, supernodeDetail } from '../../src/models/interface/supernodes'

type Props = {

};

const nodeInfo = (props: Props) => {
    const router = useRouter()
    const { address } = router.query
    const [detailData, setdetailData] = useState<supernodeDetail>({
        AvgBlockSize: 0,
        AvgBlockSizeStr: '',
        AvgTxPerBlock: 0,
        AvgTxPerBlockStr: '',
        GenBlockDelay: 0,
        GenBlockDelayStr: '',
        LatestBlockNumber: 0,
        MissBlockRate: 0,
        MissBlockRateStr: '',
        NodeAddress: ''
    })
    const [spinshow, setspinshow] = useState(true)
    const [postData, setpostData] = useState<postsupernodeDetailList>({ address: address as string, page: 1, size: 10, reqName: "transactions", seqId: 0 })
    useEffect(() => {
        if (address) {
            setspinshow(false)
            setpostData({ address: address as string, page: 1, size: 10, reqName: "transactions", seqId: 0 })
            postSupernodeDetail({ address: address as string, pastTime: 1440, reqName: "info" }).then((res: any) => {
                setdetailData(res.data)
            }).finally(() => {
                setspinshow(true)
            })
        }
    }, [address])

    return (
        <div className={styles.page_padding}>
            <SupernodeDetail
                title='Supernode Info'
                detailData={detailData}
                spinshow={spinshow}
            />
            <SupernodeTable
                tableTitle='Transactions'
                columnsData={txColumns}
                loadTableListFun={postSupernodeDetail}
                postData={postData}
                initalPostData={postData}
                tableType='supernodeTable'
            />
        </div>
    )
}

export default nodeInfo