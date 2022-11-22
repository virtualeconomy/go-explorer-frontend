//Paging request parameter data type
export interface postDataType {
    page?: number;
    size?: number;
    num?: number;
    seqId?:number;
    blocksHeight?:number;
}

//get request parameter data type
export interface getAddressTokenTransactionType {
    address: string
    page: number
    size: number
}

//transactions table 
export interface TransactionDataType {
    key: React.Key;
    Id: string;
    Type: number;
    Fee: any;
    SenderAddress: string;
    Recipient: string;
    Amount: any;
    TimeStamp: number;
}

//transactionDetail table
export interface TransactionDetailDataType {
    TypeName: string;
    Id: string;
    TimeStamp: number;
    BlockHeight: number;
    Recipient: string;
    Amount: number;
    Fee: number;
    Status: string;
    Attachment: string;
    TxExplain: any;
    SenderAddress: string
}

//addressDetail table
export interface addressDetailDataType {
    regular: string;
    available: string;
    LeaseInBalanceStr: string;
    LeaseOutBalanceStr: string;
}

//ContractDetail table
export interface contractDetailDataType {
    contractType: string;
    creatorAddress: string;
    id: string;
    transactionId: string;
    timestamp: number;
    funcList: any[]
}

//AddressDetail Component Props
export type AddressDetailProps = {
    title: string;
    subtitle: string;
    detailData: addressDetailDataType;
    spinshow: boolean;
}

//ContractDetail Component Props
export type ContractDetailProps = {
    title: string;
    detailData: contractDetailDataType;
    spinshow: boolean;
}

//TransactionsDetail Component Props
export type TransactionsDetailProps = {
    title: string;
    id: string;
    detailData: TransactionDetailDataType;
    spinshow: boolean;
}
