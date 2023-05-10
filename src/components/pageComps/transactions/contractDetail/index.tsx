import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from '../transactionsDetail/tableDetail.module.scss'
import { ContractDetailProps } from '../../../../models/interface/transactions'
import moment from 'moment';
import { VSYS_TIME } from '../../../../utils/constant';
import React from 'react';
import Link from 'next/link';


const ContractDetail = (props: ContractDetailProps) => {

    const router = useRouter()
    return (
        <div className={styles.tableDetail}>
            <Descriptions title={props.title} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                <Descriptions.Item className={styles.subtitle}>{props.detailData?.id}</Descriptions.Item>
                <Descriptions.Item label='Contract Type' style={{ border: 'none' }}>
                    <span>{props.detailData?.contractType}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Creator Address'>
                    <Link href={{ pathname: '/address/' + props.detailData?.creatorAddress  }}>
                        <a  >{props.detailData?.creatorAddress}</a>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label='Time Stamp'>
                    <span>{props.detailData?.timestamp / VSYS_TIME ? moment(props.detailData?.timestamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Transaction'>
                    <Link href={{ pathname: '/transactions/' + props.detailData?.transactionId }}>
                        <a  >{props.detailData?.transactionId}</a>
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label='Function'>
                <div style={{lineHeight:"22px"}}>
                    {
                        props.detailData?.funcList?.map((item) => {
                            return <div key={item.index + item.Name}>{item.Name}({item.Args?.map((i: any, index: number) => {
                                return <b key={index + i}> {i} </b>
                            })})</div>
                        })
                    }
                </div>
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

export default ContractDetail