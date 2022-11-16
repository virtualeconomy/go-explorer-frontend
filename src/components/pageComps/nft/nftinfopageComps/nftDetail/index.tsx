import Link from 'next/link'
import { Descriptions, Image } from 'antd';
import styles from '../../../../pageComps/transactions/transactionsDetail/tableDetail.module.scss'
import { NftDeailProps } from '../../../../../models/interface/nft';
import moment from 'moment';
import { VSYS_TIME } from '../../../../../utils/constant';


const NftInfoDetail = (props: NftDeailProps) => {
    return (
        <div className={styles.table}>
            <div className={styles.tableDetail}>
                <Descriptions title={props.detailData?.NftDetail.Attributes.Name || '***'} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                    <Descriptions.Item className={styles.icon}> <Image preview={false} src={props.detailData?.NftDetail.Attributes.IconUrl} fallback='/NftDef.jpg' alt={''} /> </Descriptions.Item>
                    <Descriptions.Item className={styles.subtitle}>{props.detailData?.NftDetail.NftTokenId}</Descriptions.Item>
                    <Descriptions.Item className={styles.icon_media} style={{ border: 'none' }}> <Image preview={false} src={props.detailData?.NftDetail.Attributes.IconUrl} fallback='/NftDef.jpg' alt={''} /> </Descriptions.Item>
                    <Descriptions.Item label='Transactions' style={{ border: 'none' }}>
                        <span>{props.detailData?.TransactionNumber}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Unique NFTs that changed owners 24h'>
                        <span>{props.detailData?.ChangeOwnerLastDay}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Creation transaction'>
                        <Link href={'/transactions/transactionDetail/' + props.detailData?.NftDetail.Id}>
                            <a href="">{props.detailData?.NftDetail.Id}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Creation Block'>
                        <Link href={'/blocks/detail/' + props.detailData.NftDetail.CreatingHeight}>
                            <a>{props.detailData?.NftDetail.CreatingHeight}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Creation time'>
                        <span>{props.detailData?.NftDetail.RegisterTime / VSYS_TIME ? moment(props.detailData?.NftDetail.RegisterTime / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Creator'>
                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.NftDetail.Id } }}>
                            <a href="">{props.detailData?.NftDetail.Attributes.Creator}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Current Owner'>
                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.NftDetail.Id } }}>
                            <a href="">{props.detailData?.NftDetail.CurrentOwner}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Collection'>
                        <span>{props.detailData?.NftDetail.ContractId}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Description'>
                        <span>{props.detailData?.NftDetail.Attributes.Description}</span>
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
        </div>
    )
}

export default NftInfoDetail