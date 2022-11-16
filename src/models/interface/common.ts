import { TransactionDataType, postDataType } from './transactions'
import { BlocksDataType } from './home'
import type { ColumnsType } from 'antd/es/table'
import { tokenInfotable, TokenIssuanceRecrod, TokenListType, TokenTransactionsRecords } from './token';
import { postsupernodeDetail, supernodes, postsupernodeDetailList } from './supernodes';
import { nftCordget, nftdetailgetdata, nftRegistryTabledataType, nftsTabledataType, nftTransactionsTabledataType } from './nft';

//intergrate the all interfaces about table list
export interface commonTableListType extends TransactionDataType, BlocksDataType, TokenListType, tokenInfotable, supernodes, nftsTabledataType, nftTransactionsTabledataType, nftRegistryTabledataType, TransactionDataType {
    key: React.Key;
}

export interface commonTablePostData extends postDataType, postsupernodeDetail, postsupernodeDetailList, TokenTransactionsRecords, TokenIssuanceRecrod, nftCordget, nftdetailgetdata {

}

export type commonTableProps = {
    addressID?: string,
    columnsData: ColumnsType<commonTableListType>,
    doublecolumnsData?: ColumnsType<commonTableListType>,
    tableTitle: string,
    doubletableTitle?: string,
    postData?: commonTablePostData,
    doublepostData?: commonTablePostData,
    initalPostData?: commonTablePostData,
    doubleinitalPostData?: commonTablePostData,
    tableType?: string,
    viewPath?: string,
    loadTableListFun: Function,
    doubleloadTableListFun?: any
    postID?: any,
    addressTokenlist?: any,
    initdata?: any
};