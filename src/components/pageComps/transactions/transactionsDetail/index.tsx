import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from './tableDetail.module.scss'
import Link from 'next/link'
import moment from 'moment'
import { TransactionsDetailProps } from '../../../../models/interface/transactions'
import { VSYS_PRECISION, VSYS_TIME } from '../../../../utils/constant'
import { byteArrayToString } from '../../../../utils/tools';

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
                <Descriptions.Item label='Attachment'>
                    <span>{props.detailData?.Attachment ? byteArrayToString(props.detailData?.Attachment) : '_'}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Time Stamp'>
                    <span>{props.detailData?.TimeStamp / VSYS_TIME ? moment(props.detailData?.TimeStamp / VSYS_TIME).format('YYYY-MM-DD HH:mm:ss') : ''}</span>
                </Descriptions.Item>
                <Descriptions.Item label='Block Height'>
                    <Link replace href={{ pathname: '/blocks/detail/' + props.detailData?.BlockHeight }}>
                        <a href="">{props.detailData?.BlockHeight}</a>
                    </Link>
                </Descriptions.Item>
                {
                    props.detailData?.TxExplain?.TxType == 'token' ?
                        <Descriptions.Item label='Explain'>
                            {
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'register' ?
                                    <div>
                                        Create token 
                                        <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId } }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId}</a>
                                        </Link>
                                        with Max Supply {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Max / props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Unity}
                                        ,Unity {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Unity}
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'supersede' ?
                                    <div>
                                        Set issuer to 
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.SenderAddress } }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.SenderAddress}</a>
                                        </Link>
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'destroy' ?
                                    <div>
                                        token
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.SenderAddress } }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.SenderAddress}</a>
                                        </Link> destroyed
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'transfer' ?
                                <div>
                                    transfer token (
                                    <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                        <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId}</a>
                                    </Link>)
                                </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'send' ?
                                <div style={{lineHeight:"22px",display:'inline-block'}}>
                                     
                                    send token <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                        <a href="" style={{margin:0}}>{'('+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                    </Link> {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        ,with Unity ({props.detailData?.TxExplain?.TxExtend?.Info?.Unity}) <br/>
                                        from <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                        </Link><br/>  
                                        to <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                        </Link>
                                </div> :
                                 props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'deposit' ?
                                 <div style={{lineHeight:"22px",display:'inline-block' }}>
                                     Deposit token <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                         <a href="" style={{margin:0}}>{"("+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                     </Link>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        ,with Unity ({props.detailData?.TxExplain?.TxExtend?.Info?.Unity})<br/>
                                        from <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                        </Link><br/>
                                        to <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress}</a>
                                        </Link>
                                 </div> :
                                 props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'withdraw'  ?
                                 <div style={{lineHeight:"22px",display:'inline-block' }}>
                                     withdraw token <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                         <a href="" style={{margin:0}}>{"("+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                     </Link>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        ,with Unity ({props.detailData?.TxExplain?.TxExtend?.Info?.Unity})<br/>
                                        from <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                        </Link><br/>
                                        to <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress}</a>
                                        </Link>
                                 </div> :
                                 props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'updateList' ?
                                 <div>
                                     token action updateList updateAddress:
                                    <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.UpdateAddress} }}>
                                        <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.UpdateAddress}</a>
                                    </Link>
                                 </div> :''
                            }
                        </Descriptions.Item> : props.detailData?.TxExplain?.TxType == 'nft' ?
                        <Descriptions.Item label='Explain'>
                                {
                                    props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'register' ?
                                        <div>
                                            Create NFT conllection 
                                            <Link href={{ pathname: '/nft/collection', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.ContractId } }}>
                                                <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.ContractId}</a>
                                            </Link>
                                        </div> :
                                    props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'supersede' ?
                                        <div>
                                            Set issuer to 
                                            <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer } }}>
                                                <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer}</a>
                                            </Link>
                                        </div> : 
                                    props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'issue' ?
                                    <div>
                                        Issuer address (
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer}</a>
                                        </Link>)
                                    </div> :
                                    props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'send' ?
                                    <div style={{lineHeight:"22px",display:'inline-block'}}>
                                        send NFT <Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId} }}>
                                            <a href="" style={{margin:0}}>{'('+ props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId+')'}</a>
                                        </Link><br/>
                                            from <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                            </Link><br/>
                                            to <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                                <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                            </Link>
                                    </div> :
                                    props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'transfer' ?
                                    <div>
                                        transfer NFT (
                                        <Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId} }}>
                                            <a href="" style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId}</a>
                                        </Link>)
                                    </div> :''
                                }
                        </Descriptions.Item> : 
                        <Descriptions.Item label='Recipient'>
                            <Link replace href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.Recipient } }}>
                                <a href="">{props.detailData?.Recipient}</a>
                            </Link>
                        </Descriptions.Item>
                }
                {
                    props.detailData?.TxExplain?.TxType == 'tx'?
                    <Descriptions.Item label='Amount'>
                        <span>{(props.detailData?.Amount as number / VSYS_PRECISION).toString()} VSYS</span>
                    </Descriptions.Item>:''
                }
                
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