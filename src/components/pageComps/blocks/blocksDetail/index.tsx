import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import moment from 'moment'
import styles from '../../transactions/transactionsDetail/tableDetail.module.scss'
import { BlockDetailProps } from '../../../../models/interface/block'
import Link from 'next/link'
import { VSYS_TIME } from '../../../../utils/constant';



const TableDetail = (props: BlockDetailProps) => {

    const router = useRouter()
    return (
        <div className={styles.tableDetail}>
            <Descriptions title={props.title} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                <Descriptions.Item className={styles.subtitle}>{props.detailData?.Signature}</Descriptions.Item>
                <Descriptions.Item label='Height' style={{ border: 'none' }}>
                    <span>{props.detailData?.Height}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Version'>
                    <span>{props.detailData?.Version}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Time Stamp'>
                    <span>{props.detailData?.TimeStamp / VSYS_TIME ? moment(props.detailData?.TimeStamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Generator'>
                    <Link replace href={'/address/' + props.detailData?.Generator}>{props.detailData?.Generator}</Link>
                </Descriptions.Item>
                <Descriptions.Item label='Txs'>
                    <span>{props.detailData?.Txs}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Block ID'>
                    <span>{props.detailData?.Signature}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Parent Block ID'>
                    <Link replace href={'/blocks/' + props.detailData?.ParentBlockSig}>{props.detailData?.ParentBlockSig}</Link>
                </Descriptions.Item>
                <Descriptions.Item label='Size'>
                    <span>{props.detailData?.Size} B</span>
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

export default TableDetail