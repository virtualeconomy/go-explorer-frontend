import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from '../../transactions/transactionsDetail/tableDetail.module.scss'
import { SupernodeDetailProps } from '../../../../models/interface/supernodes';


const SupernodeDetail = (props: SupernodeDetailProps) => {

    const router = useRouter()
    return (
        <div className={styles.tableDetail}>
            <Descriptions title={props.title} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                <Descriptions.Item className={styles.subtitle}>{props.detailData?.NodeAddress}</Descriptions.Item>
                <Descriptions.Item label='Node Address' style={{ border: 'none' }}>
                    <span>{props.detailData?.NodeAddress}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Latest Block Number'>
                    <span>{props.detailData?.LatestBlockNumber}</span>
                </Descriptions.Item>
                <Descriptions.Item label='TGen Block Delay'>
                    <span>{props.detailData?.GenBlockDelayStr}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Block Minting Success Rate'>
                    <span>{props.detailData?.MissBlockRateStr}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Avg Tx Per Block'>
                    <span>{props.detailData?.AvgTxPerBlockStr}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Avg Block Size'>
                    <span>{props.detailData?.AvgBlockSizeStr}</span>
                </Descriptions.Item>
            </Descriptions>
            <div className={styles.spinning} style={{ display: (!props.spinshow) ? 'flex' : 'none' }}>
                <Image
                    preview={false}
                    alt="Loading"
                    src='/loading.svg'
                />
            </div>
        </div>
    )
}

export default SupernodeDetail