import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TableDetail from '../../../src/components/pageComps/transactions/transactionsDetail/index'
import styles from '../../blocks/page_padding.module.scss'
import { postTransactionDetail } from '../../../src/api/index'
import { TransactionDetailDataType } from '../../../src/models/interface/transactions'

type Props = {

};

const TransactionDetail = (props: Props) => {
    const router = useRouter()
    const { id } = router.query

    const [detailData, setdetailData] = useState<object>({})
    const [spinshow, setspinshow] = useState(false)

    useEffect(() => {
        if (id) {
            postTransactionDetail(id as string).then(res => {
                let code = res.data.code
                if (!code) {
                    setdetailData(res.data)
                }
            }).finally(() => {
                setspinshow(true)
            })
        }
    }, [id])


    return (
        <div className={styles.page_padding}>
            <TableDetail
                title={'Transaction Details'}
                id={id as string}
                detailData={detailData as TransactionDetailDataType}
                spinshow={spinshow}
            />
        </div>
    )
}

export default TransactionDetail