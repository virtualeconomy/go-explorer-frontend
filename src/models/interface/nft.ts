import { ColumnsType } from "antd/es/table"

//nftgeneralType
export interface nftgeneralType {
    totalNft: number,
    newNft: number,
    transactionNumber: number
}

//nft general component props
export type NftGeneralProps = {
    generalData: nftgeneralType,
    show: boolean
}

//nft collections type
export interface nftcollectionsType {
    Name: string;
    CreatingHeight: string;
    IconUrl: string;
    ContractId: string;
}

//nft collectionsInfo component props
export type NftCollectionsInfoProps = {
    collectionsData: nftcollectionsType[],
    updateCollections: Function,
    spinshow: boolean,
}

//nfts paralleingtableType
export interface paralleingtableType {
    key?: React.Key
    ContractId: string;
    num: number;
    name: string
}

//nft ParalleingTableProps
export type NftParallelingTableProps = {
    tablelist: Array<paralleingtableType>;
    columnsdata: ColumnsType<paralleingtableType>;
    tabletitle: string;
    spinshow: boolean;
}

//nft collectiongeneralType
export interface nftCollectionGeneralType {
    totalNft: number,
    newNft: number,
    transactionNumber: number
}

//nft collectiongeneral component Props
export type CollectionGeneralProps = {
    generalData: nftCollectionGeneralType
}

//nft collection request data
export interface nftCordget {
    contractId?: string,
    page?: number,
    size?: number
}

//nft card Icon 
export interface nftCardIcon {
    Name: string,
    IconUrl: string,
    Status?: boolean,
    CollectionName: string,
    Creator?: string,
    Description?: string
}

//  nft card type
export interface nftCard {
    Attributes: nftCardIcon
    NftTokenId: string;
}

//nft collectionsInfo component props
export type NftCardProps = {
    nftsdata: nftCard[],
    loadMore: any,
    spinshow: boolean,
    total: number
}

//nftDetail 
export interface nftDetailList {
    Attributes: nftCardIcon,
    Id: string,
    NftTokenId: string,
    CreatingHeight: number,
    RegisterTime: number,
    CurrentOwner: string,
    ContractId: string,
    description: string,
}

//nftDetail type
export interface nftDetail {
    NftDetail: nftDetailList
    TransactionNumber: number,
    ChangeOwnerLastDay: number,
}

//nftDetail component props
export type NftDeailProps = {
    detailData: nftDetail;
    spinshow: boolean;
}

export interface nftdetailgetdata {
    nftTokenId?: string,
    page?: number,
    size?: number
}

export interface owership {
    Id: string,
    Timestamp: number,
    NewOwner: string,
    OldOwner: string,
    TransactionType: string,
}

//nftOwershiphistory type
export interface nftOwershiphistory {
    data: Array<owership>
    total: number
}

//nftOwnershiphistory component props
export type NftOwnershiphistoryProps = {
    detailList: nftOwershiphistory;
    spinshow: boolean;
    nftID: string;
    loadMore: any
}

//nftTabledataType
export interface nftsTabledataType {
    Attributes: nftCardIcon
    ContractId: string,
    CurrentOwner: string,
    NftTokenId: string,
    CreatingHeight: string,
    Id: string,
    RegisterTime: number
}

//nftTransactionsTabledataType
export interface nftTransactionsTabledataType {
    Id: string,
    FuncName: string,
    FuncSender: string,
    FuncRecipient: string,
    Timestamp: number
}

//nftRegistryTabledataType
export interface nftRegistryTabledataType {
    Id: string,
    recipientAddress: string,
    senderAddress: string,
    LastTransferTime: number,
    RegisterTime: number
}