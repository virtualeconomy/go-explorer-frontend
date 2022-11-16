import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from './tableDetail.module.scss'
import Link from 'next/link'
import moment from 'moment'
import { TransactionsDetailProps } from '../../../../models/interface/transactions'
import { VSYS_PRECISION, VSYS_TIME } from '../../../../utils/constant'

const TransactionDetail = (props: TransactionsDetailProps) => {

    const router = useRouter()
    return (
        <div className={styles.tableDetail}>
            <Descriptions title={props.title} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                <Descriptions.Item className={styles.subtitle}>{props.id}</Descriptions.Item>
                <Descriptions.Item label='Type' style={{ border: 'none' }}>
                    <span>{props.detailData?.TypeName}</span>
                </Descriptions.Item>
                <Descriptions.Item label='ID'>
                    <span>{props.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Time Stamp'>
                    <span>{props.detailData?.TimeStamp / VSYS_TIME ? moment(props.detailData?.TimeStamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Block Height'>
                    <Link replace href={{ pathname: '/blocks/detail/' + props.detailData?.BlockHeight }}>
                        <a href="">{props.detailData?.BlockHeight}</a>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label='Recipient'>
                    <Link replace href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.Recipient } }}>
                        <a href="">{props.detailData?.Recipient}</a>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label='Amount'>
                    <span>{(props.detailData?.Amount as number / VSYS_PRECISION).toString()} VSYS</span>
                </Descriptions.Item>
                <Descriptions.Item label='Fee'>
                    <span>{(props.detailData?.Fee as number / VSYS_PRECISION).toString()} VSYS</span>
                </Descriptions.Item>
                <Descriptions.Item label='Status'>
                    <span>{props.detailData?.Status}</span>
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

export default TransactionDetail