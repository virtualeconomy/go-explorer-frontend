import Link from 'next/link'
import { Descriptions, Image } from 'antd';
import styles from '../../../pageComps/transactions/transactionsDetail/tableDetail.module.scss'
import { TokenInfoDetailProps } from '../../../../models/interface/token'
import { VSYS_TIME } from '../../../../utils/constant';
import BigNumber from "bignumber.js";
import moment from 'moment';


const TokenInfoDetail = (props: TokenInfoDetailProps) => {
    return (
        <div className={styles.table}>
            <div className={styles.tableDetail}>
                <Descriptions title={props.detailData?.Symbol ? props.detailData?.Symbol : '***'} column={1} style={{ display: (props.spinshow) ? 'block' : 'none' }} >
                    <Descriptions.Item className={styles.icon}> <Image preview={false} src={props.detailData.IconUrl ? props.detailData.IconUrl : '/Group.svg'} fallback='/Group.svg' alt={''} /> </Descriptions.Item>
                    <Descriptions.Item className={styles.subtitle}>{props.detailData?.TokenId}</Descriptions.Item>
                    <Descriptions.Item className={styles.icon_media} style={{ border: 'none' }}> <Image preview={false} src={props.detailData?.IconUrl} fallback='/Group.svg' alt={''} /> </Descriptions.Item>
                    <Descriptions.Item label='Max Supply' style={{ border: 'none' }}>
                        <span>{ BigNumber(props.detailData?.TotalSupply).dividedBy(props.detailData.Unity)+''}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Issued Token'>
                        <span>{BigNumber(props.detailData?.CurrentSupply).dividedBy(props.detailData.Unity)+''}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Register Time'>
                        <span>{props.detailData?.RegisterTime / VSYS_TIME ? moment(props.detailData?.RegisterTime / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Issuer'>
                        <Link replace href={{ pathname: '/address/' + props.detailData?.Issuer }}>
                            <a  >{props.detailData?.Issuer}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Maker'>
                        <Link replace href={{ pathname: '/address/' + props.detailData?.Maker }}>
                            <a  >{props.detailData?.Maker}</a>
                        </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label='Unity'>
                        <span>{props.detailData?.Unity}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label='Description'>
                        <span>{props.detailData?.Describe}</span>
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

export default TokenInfoDetail