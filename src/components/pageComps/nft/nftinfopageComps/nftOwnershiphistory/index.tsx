import Link from 'next/link'
import { Descriptions, Image, Button } from 'antd';
import styles from '../../../../pageComps/transactions/transactionsDetail/tableDetail.module.scss'
import { NftOwnershiphistoryProps } from '../../../../../models/interface/nft';
import moment from 'moment';
import { VSYS_TIME } from '../../../../../utils/constant';


const OwnershiphistoryDetail = (props: NftOwnershiphistoryProps) => {
    return (
        <div className={styles.table}>
            <div className={styles.tableDetail}>
                <div style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                    <Descriptions title='Ownership history' column={1} >
                        <Descriptions.Item className={styles.subtitle}>{props.nftID}</Descriptions.Item>
                    </Descriptions>
                    {
                        props.detailList?.data.map((item, index) => {
                            return (
                                <Descriptions key={item.Id + index} column={1} className={styles.ownership_history_detail} style={{ display: (props.spinshow) ? 'block' : 'none', borderBottom: '.5px solid' }}>
                                    <Descriptions.Item label='Owner' style={{ border: 'none' }}>
                                        <Link href={{ pathname: '/address/' + item.FuncRecipient ? item.FuncRecipient : item.FuncData.Issuer }}>
                                            <a  >{item.FuncRecipient ? item.FuncRecipient : item.FuncData.Issuer}</a>
                                        </Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label='Transactions hash' style={{ border: 'none' }}>
                                        <Link href={'/transactions/' + item.Id}>
                                            <a  >{item.Id}</a>
                                        </Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label='Transfer Date' style={{ border: 'none' }}>
                                        {item.Timestamp / VSYS_TIME ? moment(item.Timestamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}
                                    </Descriptions.Item>
                                </Descriptions>
                            )
                        })
                    }
                    <span className={styles.page_sgin}>{props.detailList.total}/{props.detailList.data.length}</span>
                    <Button className={styles.more_btn} style={{ display: props.detailList.total <= props.detailList.data.length ? 'none' : 'block' }} onClick={() => { props.loadMore() }}>Load More</Button>
                </div>
                <div className={styles.spinning} style={{ display: (!props.spinshow) ? 'flex' : 'none' }}>
                    <Image
                        preview={false}
                        alt="Loading"
                        src='/loading.svg'
                    />
                </div>
            </div>
        </div>
    )
}

export default OwnershiphistoryDetail