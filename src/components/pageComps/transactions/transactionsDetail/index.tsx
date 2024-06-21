import { useRouter } from 'next/router'
import { Descriptions, Image } from 'antd';
import styles from './tableDetail.module.scss'
import Link from 'next/link'
import moment from 'moment'
import { TransactionsDetailProps } from '../../../../models/interface/transactions'
import { VSYS_PRECISION, VSYS_TIME } from '../../../../utils/constant'
import { byteArrayToString, isVSYSToken } from '../../../../utils/tools';
import BigNumber from "bignumber.js";

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
                    <Link replace href={{ pathname: '/blocks/' + props.detailData?.BlockHeight }}>
                        <a>{props.detailData?.BlockHeight}</a>
                    </Link>
                </Descriptions.Item>
                {
                    props.detailData?.TxExplain?.TxType == 'token' ?
                        <Descriptions.Item label='Explain'>
                            {
                                props.detailData?.TxExplain?.Transaction?.FuncName == 'register' ?
                                    <div>
                                        Create token &nbsp;
                                        <Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                            <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                        </Link>&nbsp;
                                        with Max Supply {BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Max).dividedBy(props.detailData?.TxExplain?.Transaction?.FuncData?.Unity) + ''}
                                        &nbsp;,&nbsp;Unity {props.detailData?.TxExplain?.Transaction?.FuncData?.Unity}
                                    </div> :
                                    props.detailData?.TxExplain?.Transaction?.FuncName == 'supersede' ?
                                        <div>
                                            Set issuer to &nbsp;
                                            <Link href={{ pathname: '/address/' + props.detailData?.SenderAddress }}>
                                                <a style={{ margin: 0 }}>{props.detailData?.SenderAddress}</a>
                                            </Link>&nbsp;
                                        </div> :
                                        props.detailData?.TxExplain?.Transaction?.FuncName == 'issue' ?
                                            <div>
                                                {BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                &nbsp;(With Unity {props.detailData?.TxExplain?.Info?.Unity})&nbsp;token&nbsp;
                                                <Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                    <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.TokenId + ")"}</a>
                                                </Link>&nbsp;issued
                                            </div> :
                                            props.detailData?.TxExplain?.Transaction?.FuncName == 'destroy' ?
                                                <div>
                                                    {BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                    &nbsp;(With Unity {props.detailData?.TxExplain?.Info?.Unity})&nbsp;token&nbsp;
                                                    <Link href={{ pathname: '/address/' + props.detailData?.SenderAddress }}>
                                                        <a style={{ margin: 0 }}>{'(' + props.detailData?.SenderAddress + ")"}</a>
                                                    </Link>&nbsp; destroyed
                                                </div> :
                                                props.detailData?.TxExplain?.Transaction?.FuncName == 'transfer' ?
                                                    <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                        Transfer token&nbsp;
                                                        <Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                            <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                                        </Link>&nbsp;&nbsp;
                                                        {BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                        &nbsp;(With Unity {props.detailData?.TxExplain?.Info?.Unity})
                                                        {
                                                            props.detailData?.Status == 'Success' ?
                                                                <div>
                                                                    From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                                        <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                                    </Link><br />
                                                                    To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncRecipient }}>
                                                                        <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncRecipient}</a>
                                                                    </Link>
                                                                </div> : <div></div>
                                                        }
                                                    </div> :
                                                    props.detailData?.TxExplain?.Transaction?.FuncName == 'send' ?
                                                        <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                            Send token&nbsp;<Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                                <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                                            </Link>&nbsp; {BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                            &nbsp;(with Unity {props.detailData?.TxExplain?.Info?.Unity}) <br />
                                                            From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                                <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                            </Link><br />
                                                            To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncRecipient }}>
                                                                <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncRecipient}</a>
                                                            </Link>
                                                        </div> :
                                                        props.detailData?.TxExplain?.Transaction?.FuncName == 'deposit' ?
                                                            <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                                Deposit token&nbsp; <Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                                    <a style={{ margin: 0 }}>{"(" + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                                                </Link>&nbsp;&nbsp;{BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                                &nbsp;&nbsp;(with Unity {props.detailData?.TxExplain?.Info?.Unity})<br />
                                                                From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                                    <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                                </Link><br />
                                                                To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncData?.ActionAddress }}>
                                                                    <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncData?.ActionAddress}</a>
                                                                </Link>
                                                            </div> :
                                                            props.detailData?.TxExplain?.Transaction?.FuncName == 'withdraw' ?
                                                                <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                                    Withdraw token&nbsp;<Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                                        <a style={{ margin: 0 }}>{"(" + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                                                    </Link>&nbsp;{BigNumber(props.detailData?.TxExplain?.Transaction?.FuncData?.Amount).dividedBy(props.detailData?.TxExplain?.Info?.Unity) + ''}
                                                                    &nbsp;(with Unity {props.detailData?.TxExplain?.Info?.Unity})<br />
                                                                    From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                                        <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                                    </Link><br />
                                                                    To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncData?.ActionAddress }}>
                                                                        <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncData?.ActionAddress}</a>
                                                                    </Link>
                                                                </div> :
                                                                props.detailData?.TxExplain?.Transaction?.FuncName == 'updateList' ?
                                                                    <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                                        UpdateList token&nbsp;<Link href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenId }}>
                                                                            <a style={{ margin: 0 }}>{"(" + props.detailData?.TxExplain?.Transaction?.TokenId + ')'}</a>
                                                                        </Link><br />
                                                                        UpdateAddress&nbsp;:&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncData?.UpdateAddress }}>
                                                                            <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncData?.UpdateAddress}</a>
                                                                        </Link>
                                                                    </div> : <div></div>
                            }
                        </Descriptions.Item> : props.detailData?.TxExplain?.TxType == 'nft' ?
                            <Descriptions.Item label='Explain'>
                                {
                                    props.detailData?.TxExplain?.Transaction?.FuncName == 'register' ?
                                        <div>
                                            Create NFT conllection&nbsp;
                                            <Link href={{ pathname: '/nft/collection', query: { id: props.detailData?.TxExplain?.Transaction?.ContractId } }}>
                                                <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.ContractId + ')'}</a>
                                            </Link>
                                        </div> :
                                        props.detailData?.TxExplain?.Transaction?.FuncName == 'supersede' ?
                                            <div>
                                                Set issuer to&nbsp;
                                                <Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncData.Issuer }}>
                                                    <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncData.Issuer}</a>
                                                </Link>
                                            </div> :
                                            props.detailData?.TxExplain?.Transaction?.FuncName == 'issue' ?
                                                <div>
                                                    NFT&nbsp;<Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.Transaction?.NftTokenId } }}>
                                                        <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.NftTokenId + ')'}</a>
                                                    </Link>&nbsp;issued
                                                </div> :
                                                props.detailData?.TxExplain?.Transaction?.FuncName == 'send' ?
                                                    <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                        Send NFT&nbsp;<Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.Transaction?.NftTokenId } }}>
                                                            <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.NftTokenId + ')'}</a>
                                                        </Link><br />
                                                        From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                            <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                        </Link><br />
                                                        To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncRecipient }}>
                                                            <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncRecipient}</a>
                                                        </Link>
                                                    </div> :
                                                    props.detailData?.TxExplain?.Transaction?.FuncName == 'transfer' ?
                                                        <div style={{ lineHeight: "22px", display: 'inline-block' }}>
                                                            Transfer NFT&nbsp;
                                                            <Link href={{ pathname: '/nft/nftInfo', query: { id: props.detailData?.TxExplain?.Transaction?.NftTokenId } }}>
                                                                <a style={{ margin: 0 }}>{'(' + props.detailData?.TxExplain?.Transaction?.NftTokenId + ')'}</a>
                                                            </Link>
                                                            {
                                                                props.detailData?.Status == 'Success' ?
                                                                    <div>
                                                                        From&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncSender }}>
                                                                            <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncSender}</a>
                                                                        </Link><br />
                                                                        To&nbsp;<Link href={{ pathname: '/address/' + props.detailData?.TxExplain?.Transaction?.FuncRecipient }}>
                                                                            <a style={{ margin: 0 }}>{props.detailData?.TxExplain?.Transaction?.FuncRecipient}</a>
                                                                        </Link>
                                                                    </div> : ''
                                                            }
                                                        </div> : <div></div>
                                }
                            </Descriptions.Item> :
                            props.detailData?.TypeName == 'dbput' ?
                                <Descriptions.Item label='Data'>
                                    <span style={{ lineHeight: "22px", display: '-webkit-box', width: "40%", height: '44px', textOverflow: 'ellipsis', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{props.detailData?.DBEntry?.Data}</span>
                                </Descriptions.Item> :
                                props.detailData?.TxExplain?.TxFuncName == 'vswap' ?
                                    (props.detailData?.TxExplain?.Transaction?.FuncName == 'swapExactTokenForBaseToken' || props.detailData?.TxExplain?.Transaction?.FuncName == "swapTokenForExactBaseToken" ?
                                        <Descriptions.Item label='Explain'>
                                            Swap :&nbsp;In&nbsp;
                                            {isVSYSToken(props.detailData?.TxExplain?.Transaction?.TokenBId) ? " VSYS" :
                                                <Link replace href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenBId }}>
                                                    <a  >{props.detailData?.TxExplain?.Transaction?.TokenBId}</a>
                                                </Link>}
                                            &nbsp;{props.detailData?.TxExplain?.Transaction?.VSwapDetails?.amountIn / props.detailData?.TxExplain?.Transaction?.TokenBUnity}&nbsp;
                                            Out&nbsp;
                                            {isVSYSToken(props.detailData?.TxExplain?.Transaction?.TokenAId) ? " VSYS" :
                                                <Link replace href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenAId }}>
                                                    <a  >{props.detailData?.TxExplain?.Transaction?.TokenAId}</a>
                                                </Link>}&nbsp;{props.detailData?.TxExplain?.Transaction?.VSwapDetails?.amountOut / props.detailData?.TxExplain?.Transaction?.TokenAUnity}
                                        </Descriptions.Item> :
                                        props.detailData?.TxExplain?.Transaction?.FuncName == 'swapExactTokenForTargetToken' || props.detailData?.TxExplain?.Transaction?.FuncName == 'swapTokenForExactTargetToken' ?
                                            <Descriptions.Item label='Explain'>
                                                swap&nbsp;In&nbsp;
                                                {isVSYSToken(props.detailData?.TxExplain?.Transaction?.TokenAId) ? " VSYS" :
                                                    <Link replace href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenAId }}>
                                                        <a  >{props.detailData?.TxExplain?.Transaction?.TokenAId}</a>
                                                    </Link>}&nbsp;{props.detailData?.TxExplain?.Transaction?.VSwapDetails?.amountIn / props.detailData?.TxExplain?.Transaction?.TokenAUnity}&nbsp;
                                                Out&nbsp;
                                                {isVSYSToken(props.detailData?.TxExplain?.Transaction?.TokenBId) ? " VSYS" :
                                                    <Link replace href={{ pathname: '/token/' + props.detailData?.TxExplain?.Transaction?.TokenBId }}>
                                                        <a  >{props.detailData?.TxExplain?.Transaction?.TokenBId}</a>
                                                    </Link>} &nbsp;{props.detailData?.TxExplain?.Transaction?.VSwapDetails?.amountOut / props.detailData?.TxExplain?.Transaction?.TokenBUnity}
                                            </Descriptions.Item> : "")
                                    :
                                    <Descriptions.Item label='Recipient'>
                                        <Link replace href={{ pathname: '/address/' + props.detailData?.Recipient }}>
                                            <a  >{props.detailData?.Recipient}</a>
                                        </Link>
                                    </Descriptions.Item>
                }
                {
                    props.detailData?.TxExplain?.TxType == 'tx' ?
                        <Descriptions.Item label='Sender'>
                            {
                                props.detailData?.SenderAddress ?
                                    <Link replace href={{ pathname: '/address/' + props.detailData?.SenderAddress }}>
                                        <a>{props.detailData?.SenderAddress}</a>
                                    </Link> : '-'
                            }
                        </Descriptions.Item> : ''
                }

                {
                    props.detailData?.TxExplain?.TxType == 'tx' ?
                        <Descriptions.Item label='Amount'>
                            <span>{BigNumber(props.detailData?.Amount).dividedBy(VSYS_PRECISION) + ' VSYS'}</span>
                        </Descriptions.Item> : ''
                }

                <Descriptions.Item label='Fee'>
                    <span>{BigNumber(props.detailData?.Fee).dividedBy(VSYS_PRECISION) + ' VSYS'}</span>
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