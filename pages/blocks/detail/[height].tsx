import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../page_padding.module.scss'
import BlockDetail from '../../../src/components/pageComps/blocks/blocksDetail/index'
import { getBlockDetailByHight, getBlockDetailByID } from '../../../src/api/index'
import { blockDetail } from '../../../src/models/interface/block'
import BlockTransaction from '../../../src/components/commonComps/explorerDataTable/index'
import { txColumns } from '../../../src/models/commonData/tableColumns'

type Props = {

};

const HeightDetail = (props: Props) => {
    const router = useRouter()
    const { height } = router.query


    const [detailData, setdetailData] = useState<blockDetail>({
        Generator: "",
        Height: 0,
        ParentBlockSig: "",
        Signature: "",
        Size: "0B",
        TimeStamp: 0,
        Txs: 0,
        Version: 0
    })
    const [spinshow, setspinshow] = useState(true)
    // const [postID, setpostID] = useState('')   
    const [postID, setpostID] = useState()

    function getBlockDetailByall(height: any) {
        if (height) {
            if (isNaN(height)) {
                return new Promise(function (resovle) {
                    getBlockDetailByID(height).then(res => {
                        let code = res.data.code
                        if (!code) {
                            resovle(res)
                        }
                    })
                })
            } else {
                return new Promise(function (resovle) {
                    getBlockDetailByHight(height).then(res => {
                        let code = res.data.code
                        if (!code) {
                            resovle(res)
                        }
                    })
                })
            }
        }
    }

    useEffect(() => {
        if (height) {
            setpostID(height as any)
            setspinshow(false)
            getBlockDetailByall(height as any)?.then((res: any) => {
                setdetailData(res.data.data)

            }).finally(() => {
                setspinshow(true)
            })
        }
    }, [height])


    return (
        <div className={styles.page_padding}>
            <BlockDetail
                title='Block Detail'
                detailData={detailData}
                spinshow={spinshow}
            />
            <BlockTransaction
                tableTitle='Transactions'
                columnsData={txColumns}
                loadTableListFun={getBlockDetailByall}
                tableType="DetailInfo"
                postID={postID}
            />
        </div>
    )
}

export default HeightDetail