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
                        <a>{props.detailData?.BlockHeight}</a>
                    </Link>
                </Descriptions.Item>
                {
                    props.detailData?.TxExplain?.TxType == 'token' ?
                        <Descriptions.Item label='Explain'>
                            {
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'register' ?
                                    <div>
                                        Create token &nbsp;
                                        <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId } }}>
                                            <a style={{margin:0}}>{'('+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link>&nbsp;
                                        with Max Supply {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Max / props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Unity}
                                        &nbsp;,&nbsp;Unity {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Unity}
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'supersede' ?
                                    <div>
                                        Set issuer to &nbsp;
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.SenderAddress } }}>
                                            <a style={{margin:0}}>{props.detailData?.SenderAddress}</a>
                                        </Link>&nbsp;
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'issue' ?
                                    <div>
                                        {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        &nbsp;(With Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity})&nbsp;token&nbsp;
                                        <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId } }}>
                                            <a style={{margin:0}}>{'(' +props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+ ")"}</a>
                                        </Link>&nbsp;issued
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'destroy' ?
                                    <div>
                                        {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        &nbsp;(With Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity})&nbsp;token&nbsp;
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.SenderAddress } }}>
                                            <a style={{margin:0}}>{'(' +props.detailData?.SenderAddress+ ")"}</a>
                                        </Link>&nbsp; destroyed
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'transfer' ?
                                    <div style={{lineHeight:"22px",display:'inline-block'}}>
                                        Transfer token&nbsp;
                                        <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                            <a   style={{margin:0}}>{'(' +props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link>&nbsp;&nbsp;
                                        {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        &nbsp;(With Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity}) 
                                        {
                                            props.detailData?.Status=='Success'?
                                            <div>
                                                From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                    <a style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                                </Link><br/>  
                                                To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                                    <a  style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                                </Link>
                                            </div>:''
                                        }
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'send' ?
                                    <div style={{lineHeight:"22px",display:'inline-block'}}>
                                        Send token&nbsp;<Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                            <a style={{margin:0}}>{'('+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link>&nbsp; {props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                        &nbsp;(with Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity}) <br/>
                                            From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                <a style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                            </Link><br/>  
                                            To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                                <a  style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                            </Link>
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'deposit' ?
                                    <div style={{lineHeight:"22px",display:'inline-block' }}>
                                        Deposit token&nbsp; <Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                            <a   style={{margin:0}}>{"("+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link>&nbsp;&nbsp;{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                            &nbsp;&nbsp;(with Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity})<br/>
                                            From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                            </Link><br/>
                                            To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress} }}>
                                                <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress}</a>
                                            </Link>
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'withdraw'  ?
                                   <div style={{lineHeight:"22px",display:'inline-block' }}>
                                        Withdraw token&nbsp;<Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                            <a  style={{margin:0}}>{"("+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link>&nbsp;{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.Amount / props.detailData?.TxExplain?.TxExtend?.Info?.Unity}
                                            &nbsp;(with Unity {props.detailData?.TxExplain?.TxExtend?.Info?.Unity})<br/>
                                            From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                <a  style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                            </Link><br/>
                                            To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress} }}>
                                                <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.ActionAddress}</a>
                                            </Link>
                                   </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'updateList' ?
                                    <div style={{lineHeight:"22px",display:'inline-block' }}>
                                        UpdateList token&nbsp;<Link href={{ pathname: '/token/tokenInfo', query: { Id: props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId} }}>
                                            <a   style={{margin:0}}>{"("+props.detailData?.TxExplain?.TxExtend?.Transaction?.TokenId+')'}</a>
                                        </Link><br/>
                                        UpdateAddress&nbsp;:&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.UpdateAddress} }}>
                                            <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData?.UpdateAddress}</a>
                                        </Link>
                                    </div> :''
                            }
                        </Descriptions.Item> : props.detailData?.TxExplain?.TxType == 'nft' ?
                        <Descriptions.Item label='Explain'>
                            {
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'register' ?
                                    <div>
                                        Create NFT conllection&nbsp; 
                                        <Link href={{ pathname: '/nft/collection', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.ContractId } }}>
                                            <a   style={{margin:0}}>{'('+ props.detailData?.TxExplain?.TxExtend?.Transaction?.ContractId+')'}</a>
                                        </Link>
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'supersede' ?
                                    <div>
                                        Set issuer to&nbsp;
                                        <Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer } }}>
                                            <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncData.Issuer}</a>
                                        </Link>
                                    </div> : 
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'issue' ?
                                    <div>
                                        NFT&nbsp;<Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId} }}>
                                            <a   style={{margin:0}}>{'('+ props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId+')'}</a>
                                        </Link>&nbsp;issued
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'send' ?
                                    <div style={{lineHeight:"22px",display:'inline-block'}}>
                                        Send NFT&nbsp;<Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId} }}>
                                            <a   style={{margin:0}}>{'('+ props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId+')'}</a>
                                        </Link><br/>
                                        From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                            <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                        </Link><br/>
                                        To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                            <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                        </Link>
                                    </div> :
                                props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncName == 'transfer' ?
                                    <div style={{lineHeight:"22px",display:'inline-block'}}>
                                        Transfer NFT&nbsp;
                                        <Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId} }}>
                                            <a   style={{margin:0}}>{'('+props.detailData?.TxExplain?.TxExtend?.Transaction?.NftTokenId +')'}</a>
                                        </Link>
                                        {
                                            props.detailData?.Status=='Success'?
                                            <div>
                                                From&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender} }}>
                                                    <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncSender}</a>
                                                </Link><br/>
                                                To&nbsp;<Link href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient} }}>
                                                    <a   style={{margin:0}}>{props.detailData?.TxExplain?.TxExtend?.Transaction?.FuncRecipient}</a>
                                                </Link>
                                            </div>:''
                                        }
                                    </div> :''
                            }
                        </Descriptions.Item> : 
                        <Descriptions.Item label='Recipient'>
                            <Link replace href={{ pathname: '/transactions/addressDetail', query: { address: props.detailData?.Recipient } }}>
                                <a  >{props.detailData?.Recipient}</a>
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