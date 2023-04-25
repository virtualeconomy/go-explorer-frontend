import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from '../transactionsDetail/tableDetail.module.scss'
import { AddressDetailProps } from '../../../../models/interface/transactions'
import BigNumber from "bignumber.js";
import { VSYS_PRECISION } from '../../../../utils/constant'


const AddressDetail = (props: AddressDetailProps) => {

    const router = useRouter()
    return (
        <div className={styles.tableDetail}>
            <Descriptions title={props.title} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                <Descriptions.Item className={styles.subtitle}>{props.subtitle}</Descriptions.Item>
                <Descriptions.Item label='Total Balance' style={{ border: 'none' }}>
                    <span>{BigNumber(props.detailData?.regular).dividedBy(VSYS_PRECISION)+'VSYS'}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Available Balance'>
                    <span>{BigNumber(props.detailData?.available).dividedBy(VSYS_PRECISION)+'VSYS'}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Leased In Balance'>
                    <span>{props.detailData?.LeaseInBalanceStr} VSYS</span>
                </Descriptions.Item>
                <Descriptions.Item label='Leased Out Balance'>
                    <span>{props.detailData?.LeaseOutBalanceStr} VSYS</span>
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

export default AddressDetail